const toggle = document.getElementById('autoSaveToggle');
const intervalInput = document.getElementById('saveInterval');

// 저장된 설정 불러오기
chrome.storage.local.get(['enabled', 'interval'], (result) => {
  toggle.checked = result.enabled ?? false;
  intervalInput.value = result.interval ?? 5; // 기본값 5분
});

// 스위치 변경 시
toggle.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: toggle.checked });
});

// 간격 변경 시 (숫자를 바꿀 때마다 바로 저장)
intervalInput.addEventListener('change', () => {
  let val = parseInt(intervalInput.value);
  if (val < 1) val = 1; // 최소 1분 제한
  chrome.storage.local.set({ interval: val });
});
