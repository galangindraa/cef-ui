import { isEnvBrowser } from './misc';

// CEF-specific configuration
export const CEF_CONFIG = {
  // Image loading timeout untuk CEF (dalam milliseconds)
  IMAGE_LOAD_TIMEOUT: 5000,
  
  // Retry attempts untuk image loading
  MAX_RETRY_ATTEMPTS: 3,
  
  // Delay antara retry attempts (dalam milliseconds)
  RETRY_DELAY: 1000,
  
  // Alternative image URLs untuk CEF compatibility
  ALTERNATIVE_IMAGE_URLS: [
    'https://assets.open.mp/assets/images/skins/',
    'http://assets.open.mp/assets/images/skins/',
    'https://raw.githubusercontent.com/openmultiplayer/assets/main/images/skins/',
    'https://via.placeholder.com/170x170/666666/FFFFFF?text=Skin+',
  ]
};

// Function untuk check apakah CEF mendukung external images
export const checkCEFImageSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isEnvBrowser()) {
      resolve(true);
      return;
    }

    const testImg = new window.Image();
    testImg.onload = () => resolve(true);
    testImg.onerror = () => resolve(false);
    testImg.src = 'https://via.placeholder.com/1x1/000000/000000?text=test';
    
    // Timeout setelah 3 detik
    setTimeout(() => resolve(false), 3000);
  });
};

// Function untuk get optimal image URL berdasarkan environment
export const getOptimalImageUrl = (itemId: number, isCEF: boolean = !isEnvBrowser()): string => {
  if (!isCEF) {
    return `https://assets.open.mp/assets/images/skins/${itemId}.png`;
  }

  // Untuk CEF, gunakan URL yang paling kompatibel
  return `${CEF_CONFIG.ALTERNATIVE_IMAGE_URLS[0]}${itemId}.png`;
};

// Function untuk preload image dengan retry mechanism
export const preloadImageWithRetry = (
  itemId: number, 
  onSuccess?: () => void, 
  onError?: () => void,
  retryCount: number = 0
): void => {
  if (retryCount >= CEF_CONFIG.MAX_RETRY_ATTEMPTS) {
    onError?.();
    return;
  }

  const img = new window.Image();
  img.onload = () => onSuccess?.();
  img.onerror = () => {
    setTimeout(() => {
      preloadImageWithRetry(itemId, onSuccess, onError, retryCount + 1);
    }, CEF_CONFIG.RETRY_DELAY);
  };
  
  img.src = getOptimalImageUrl(itemId);
};

// Function untuk batch preload images
export const batchPreloadImages = (itemIds: number[]): Promise<void> => {
  return new Promise((resolve) => {
    let loadedCount = 0;
    const totalCount = itemIds.length;

    if (totalCount === 0) {
      resolve();
      return;
    }

    itemIds.forEach(itemId => {
      preloadImageWithRetry(
        itemId,
        () => {
          loadedCount++;
          if (loadedCount === totalCount) {
            resolve();
          }
        },
        () => {
          loadedCount++;
          if (loadedCount === totalCount) {
            resolve();
          }
        }
      );
    });
  });
}; 