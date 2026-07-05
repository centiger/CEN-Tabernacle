# CEN Tabernacle v1.0.1

이미지 경로 보정판입니다.

## 수정 사항
- `scene/` 폴더 포함
- 모든 장면 이미지 경로를 `scene/scene-*.jpg`로 통일
- service worker 캐시도 `scene/` 기준으로 갱신
- GitHub Pages 업로드 시 루트에 그대로 올리면 동작

## 포함 이미지
- scene/scene-overview.jpg
- scene/scene-altar.jpg
- scene/scene-laver.jpg
- scene/scene-sanctuary.jpg
- scene/scene-ark.jpg

업로드 후 기존 PWA 캐시가 남아 있으면 앱 삭제 후 재설치하세요.
