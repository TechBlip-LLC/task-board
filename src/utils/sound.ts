const NOTIFICATION_SOUND = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

export function playNotification() {
  NOTIFICATION_SOUND.play().catch(() => {
    // Silence autoplay errors
  });
}