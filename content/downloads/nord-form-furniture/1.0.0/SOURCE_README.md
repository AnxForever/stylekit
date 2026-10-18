# NORD FORM / 北欧低多边形家具集

10 件可编辑的北欧风家具。实际使用 Blender 4.3.2 创建与渲染；不是二维模型示意图。

## 文件 / Files
- `furniture_gallery.blend`：完整的可编辑展厅场景，含独立家具集合、共享材质、相机与摄影棚灯光。
- `models/*.glb`：10 个独立、自包含 glTF 2.0 二进制模型。每个模型以底部中心为原点，可直接放置在地面上。
- `previews/contact_sheet.png`：带中英标签、实际三角面数及尺寸的总览。
- `previews/gallery.png`：统一比例的展厅效果图。
- `previews/01_*.png` 至 `10_*.png`：独立正交摄影棚预览；每张图自动适配画面，因此不是同一比例。
- `inventory.json`：逐模型的尺寸、评估后三角面数、部件数及材质清单。
- `build_furniture.py`：可重现的 Blender Python 生成、导出、渲染脚本。
- `compose_contact_sheet.py`：用真实 Blender 渲染图生成中英总览。
- `skills/`：本项目先调研、后制作所用的三份可复用技能与官方参考来源。

## 规格 / Technical conventions
- 单位为米。Blender 使用 Z 轴向上、家具正面为 -Y；GLB 使用标准 Y 轴向上自动转换。
- 10 件家具：餐椅、餐桌、休闲椅、双人沙发、茶几、平台床、床头柜、三抽斗柜、开放式书架、书桌。
- 各部件保持独立、具名且可编辑。木材与织物采用共享的无纹理 PBR 材质。
- 单段倒角保留在 Blender 中，GLB 导出时评估修改器；使用平面法线以保留低多边形风格。
- 床品、靠枕、书籍及储物盒属于对应模型的一部分，并计入三角面总数。
- 接合处允许构件正常交叠。家具为静态道具，无绑定、动画、碰撞体或专用 UV 贴图。
- 模型应适用于通用实时场景；未声称已针对某个游戏引擎、移动设备或制造加工进行认证。

## 重建 / Reproduce
在此文件所在目录运行：

```sh
/usr/bin/blender -b --factory-startup -t 8 --python-exit-code 1 --python build_furniture.py -- build
/usr/bin/blender -b furniture_gallery.blend -t 8 --python-exit-code 1 --python build_furniture.py -- render
python compose_contact_sheet.py
```

渲染使用 Cycles CPU；独立预览 64 采样，展厅 48 采样。此 Blender 构建没有 OpenImageDenoise，因此明确关闭降噪。总览脚本需要 Pillow 和 Noto Sans CJK 字体；如移至其他操作系统，请调整字体路径。重新运行会覆盖本包内同名输出文件。

## 使用 / Use
打开 `.blend` 后，在 Outliner 中选择对应的编号集合；`STUDIO` 是展示用摄影棚，不在 GLB 导出中。各家具根节点位于场景的陈列位置；独立 GLB 已在导出前回到原点。以 glTF 2.0 导入器导入单个 GLB，即可获得独立可用的家具。

### 检查说明 / Validation notes
独立 Blender 回导测试检查了全部 10 个 GLB，并与源模型核对尺寸、三角面数量、部件和材质；所有项目通过。源组件及评估后组件均为封闭的正体积实体，未发现退化面。glTF 材质保留 Blender 默认的双面显示；法线和体积另外做了几何验证，不依赖双面显示掩盖错误。详细检查结果请参阅随包附带的 QA JSON 报告。官方 Khronos glTF Validator 2.0.0-dev.3.10 也已验证全部 10 个 GLB：错误、警告、信息与提示均为 0；逐文件结果保存在 `qa-independent/`。
