// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StyleFormValue } from "@/app/submit/_style-form";
import { SubmitConsole } from "@/app/submit/_content";

vi.mock("@/components/i18n/localized-link", () => ({
  LocalizedLink: ({ href, children, ...props }: ComponentProps<"a">) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("@/app/submit/_style-form", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/app/submit/_style-form")>();

  function TestStyleForm({
    value,
    onChange,
  }: {
    value: StyleFormValue;
    onChange: (next: StyleFormValue) => void;
  }) {
    return (
      <div>
        <input
          aria-label="English name"
          value={value.nameEn}
          onChange={(event) => {
            const nameEn = event.currentTarget.value;
            onChange({ ...value, nameEn, slug: nameEn.toLowerCase().replace(/\s+/g, "-") });
          }}
        />
        <input
          aria-label="Description"
          value={value.description}
          onChange={(event) => onChange({ ...value, description: event.currentTarget.value })}
        />
        <textarea
          aria-label="AI rules"
          value={value.rules}
          onChange={(event) => onChange({ ...value, rules: event.currentTarget.value })}
        />
      </div>
    );
  }

  return { ...actual, StyleForm: TestStyleForm };
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

function jsonResponse(payload: unknown, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => payload,
  } as Response);
}

function gateResponse(accepted = true) {
  return {
    success: true,
    report: {
      kind: "style",
      slug: "test-style",
      accepted,
      gates: [{
        id: "schema",
        label: "Manifest schema",
        passed: accepted,
        detail: accepted ? "Valid manifest." : "Manifest is invalid.",
        severity: "blocking",
      }],
      signals: [],
      checkedAt: "2026-11-09T00:00:00.000Z",
    },
  };
}

const VALID_MANIFEST = JSON.stringify({
  schemaVersion: "1.0.0",
  formData: { name: "Test", nameEn: "Test", slug: "test-style", aiRules: ["One", "Two", "Three"] },
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe("SubmitConsole input-bound gate reports", () => {
  it("ignores a check response after form edits and keeps the newest retry when responses arrive out of order", async () => {
    const firstCheck = deferred<Response>();
    const secondCheck = deferred<Response>();
    let validationCalls = 0;
    const fetchMock = vi.fn<typeof fetch>((input) => {
      if (String(input).endsWith("/api/submit/validate")) {
        return ++validationCalls === 1
          ? firstCheck.promise
          : secondCheck.promise;
      }
      if (String(input).endsWith("/api/submit")) {
        return jsonResponse({ success: true, submission: { slug: "new-style" } });
      }
      return jsonResponse({});
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <SubmitConsole locale="en" signedIn masterPrompt="prompt" checklist={[]} />,
    );
    fireEvent.change(screen.getByLabelText("English name"), { target: { value: "New Style" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Before checking." } });
    fireEvent.change(screen.getByLabelText("AI rules"), { target: { value: "One\nTwo\nThree" } });
    fireEvent.click(screen.getByRole("button", { name: "Run checks" }));

    const firstRequestBody = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(firstRequestBody.manifest.formData.description).toBe("Before checking.");

    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "After checking." } });
    expect(screen.getByText("Run the checks to see the report.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Run checks" }));

    const secondRequestBody = JSON.parse(fetchMock.mock.calls[1][1]?.body as string);
    expect(secondRequestBody.manifest.formData.description).toBe("After checking.");

    await act(async () => {
      secondCheck.resolve(await jsonResponse(gateResponse()));
    });
    expect(await screen.findByText("Manifest schema")).toBeInTheDocument();
    await act(async () => {
      firstCheck.resolve(await jsonResponse({ success: false, error: "Old response" }, 500));
    });

    expect(screen.getByText("Manifest schema")).toBeInTheDocument();
    expect(screen.queryByText("Old response")).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/This work is mine to share/));
    const submitButton = screen.getByRole("button", { name: "Submit style" });
    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByRole("heading", { name: "Submission received" })).toBeInTheDocument());
    const submitCall = fetchMock.mock.calls.find(([url]) => String(url).endsWith("/api/submit"));
    expect(JSON.parse(submitCall?.[1]?.body as string).manifest.formData.description).toBe("After checking.");
  });

  it("binds pasted manifests to their normalized content, clears PASS while rechecking, and permits retry after a gate failure", async () => {
    const retryCheck = deferred<Response>();
    let validationCalls = 0;
    const fetchMock = vi.fn<typeof fetch>((input) => {
      if (String(input).endsWith("/api/submit/validate")) {
        validationCalls += 1;
        return validationCalls === 1
          ? jsonResponse({ ...gateResponse(false), success: false, error: "Gate failed" }, 400)
          : retryCheck.promise;
      }
      if (String(input).endsWith("/api/submit")) {
        return jsonResponse({ success: true, submission: { slug: "test-style" } });
      }
      return jsonResponse({});
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <SubmitConsole locale="en" signedIn masterPrompt="prompt" checklist={[]} />,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Paste a manifest" }));
    const manifestInput = screen.getByRole("textbox", { name: "Paste the result" });
    fireEvent.change(manifestInput, { target: { value: VALID_MANIFEST } });
    fireEvent.click(screen.getByRole("button", { name: "Run checks" }));
    expect(await screen.findByText("Gate failed")).toBeInTheDocument();

    fireEvent.change(manifestInput, { target: { value: ` ${VALID_MANIFEST} ` } });
    fireEvent.click(screen.getByRole("button", { name: "Run checks" }));
    expect(screen.getByText("Run the checks to see the report.")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/This work is mine to share/));
    expect(screen.getByRole("button", { name: "Submit style" })).toBeDisabled();

    await act(async () => {
      retryCheck.resolve(await jsonResponse(gateResponse()));
    });
    expect(await screen.findByText("Manifest schema")).toBeInTheDocument();
    const validationCall = fetchMock.mock.calls.filter(([url]) => String(url).endsWith("/api/submit/validate"))[1];
    expect(JSON.parse(validationCall[1]?.body as string).manifest).toEqual(JSON.parse(VALID_MANIFEST));

    fireEvent.click(screen.getByRole("button", { name: "Submit style" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "Submission received" })).toBeInTheDocument());
    const submitCall = fetchMock.mock.calls.find(([url]) => String(url).endsWith("/api/submit"));
    expect(JSON.parse(submitCall?.[1]?.body as string).manifest).toEqual(JSON.parse(VALID_MANIFEST));
  });
});
