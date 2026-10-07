/** Copy a canvas bitmap. Rejects when the blob or clipboard write fails. */
export const writeCanvasToClipboard = (canvas: HTMLCanvasElement): Promise<void> =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('blob is empty'));
        return;
      }
      navigator.clipboard
        .write([new ClipboardItem({ [blob.type]: blob })])
        .then(() => {
          resolve();
        })
        .catch((error: unknown) => {
          reject(error instanceof Error ? error : new Error('Failed to copy image'));
        });
    });
  });
