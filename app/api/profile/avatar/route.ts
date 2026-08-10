import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getAuthServerClient } from "@/lib/auth/supabase-server";

export const runtime = "nodejs";

const AVATAR_BUCKET = "avatars";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function getAuthenticatedUser() {
  const authClient = await getAuthServerClient();
  if (!authClient) {
    return { user: null, response: NextResponse.json({ error: "Auth is not configured" }, { status: 503 }) };
  }

  const { data, error } = await authClient.auth.getUser();
  if (error || !data.user) {
    return { user: null, response: NextResponse.json({ error: "You must be signed in" }, { status: 401 }) };
  }

  return { user: data.user, response: null };
}

async function ensureAvatarBucket(adminClient: NonNullable<ReturnType<typeof getAdminClient>>) {
  const { data: bucket } = await adminClient.storage.getBucket(AVATAR_BUCKET);
  if (bucket) {
    return null;
  }

  const { error } = await adminClient.storage.createBucket(AVATAR_BUCKET, {
    public: true,
    fileSizeLimit: `${MAX_FILE_SIZE}B`,
    allowedMimeTypes: Object.keys(MIME_TO_EXTENSION),
  });
  if (error && !/already exists/i.test(error.message)) {
    return NextResponse.json({ error: "Avatar storage is not available" }, { status: 503 });
  }

  return null;
}

async function removeUserAvatars(adminClient: NonNullable<ReturnType<typeof getAdminClient>>, userId: string) {
  const storage = adminClient.storage.from(AVATAR_BUCKET);
  const { data: existing } = await storage.list(userId, { limit: 20 });
  if (!existing?.length) {
    return;
  }

  await storage.remove(existing.map((file) => `${userId}/${file.name}`));
}

export async function POST(request: Request) {
  const { user, response } = await getAuthenticatedUser();
  if (response) {
    return response;
  }

  const adminClient = getAdminClient();
  if (!adminClient) {
    return NextResponse.json({ error: "Avatar storage is not configured" }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_FILE_SIZE + 64 * 1024) {
    return NextResponse.json({ error: "Avatar file is too large" }, { status: 413 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Avatar file is required" }, { status: 400 });
  }

  const extension = MIME_TO_EXTENSION[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Only JPG, PNG, and WebP images are supported" }, { status: 415 });
  }
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Avatar file is too large" }, { status: 413 });
  }

  const bucketError = await ensureAvatarBucket(adminClient);
  if (bucketError) {
    return bucketError;
  }

  const path = `${user!.id}/avatar.${extension}`;
  const storage = adminClient.storage.from(AVATAR_BUCKET);
  await removeUserAvatars(adminClient, user!.id);

  const { error: uploadError } = await storage.upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: true,
  });
  if (uploadError) {
    return NextResponse.json({ error: "Could not upload avatar" }, { status: 502 });
  }

  const { data } = storage.getPublicUrl(path);
  return NextResponse.json({ avatarUrl: `${data.publicUrl}?v=${Date.now()}` });
}

export async function DELETE() {
  const { user, response } = await getAuthenticatedUser();
  if (response) {
    return response;
  }

  const adminClient = getAdminClient();
  if (!adminClient) {
    return NextResponse.json({ error: "Avatar storage is not configured" }, { status: 503 });
  }

  const bucketError = await ensureAvatarBucket(adminClient);
  if (bucketError) {
    return bucketError;
  }

  await removeUserAvatars(adminClient, user!.id);
  return NextResponse.json({ avatarUrl: "" });
}
