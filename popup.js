const toggle = document.getElementById('autoSaveToggle');

// 기존 설정 불러오기
chrome.storage.local.get(['enabled'], (result) => {
  toggle.checked = result.enabled ?? false; // 기본값은 false
});

// 스위치 변경 시 저장
toggle.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: toggle.checked });
});
