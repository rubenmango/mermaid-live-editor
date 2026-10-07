import { expect, test } from './test';

test.describe('Action accessibility', () => {
  test('diagram toolbar controls have accessible names', async ({ editPage, page }) => {
    await editPage.start();
    await expect(page.getByRole('button', { name: 'Reset view', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Zoom out', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Zoom in', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Full Screen', exact: true })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
    await expect(page.getByRole('button', { name: 'Hand-Drawn', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Background Grid', exact: true })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Privacy & Security', exact: true })
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /Switch to (light|dark) theme/ })).toBeVisible();
  });

  test('Kroki is one link, and gist input fails in a toast', async ({ editPage, page }) => {
    await editPage.toggleActions();

    const kroki = page.getByRole('link', { name: 'Kroki' });
    await expect(kroki).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(kroki.locator('button, a')).toHaveCount(0);

    await page.getByRole('button', { name: 'Load Gist' }).click();
    await expect(page.getByText('Enter a Gist URL first')).toBeVisible();

    await page.getByPlaceholder('Enter Gist URL').fill('http://example.com/not-a-gist');
    await page.getByRole('button', { name: 'Load Gist' }).click();
    await expect(page.getByText('Enter a valid GitHub Gist URL')).toBeVisible();
    await expect(page).toHaveURL(/\/edit/);
  });

  test('copy markdown writes the clipboard before showing success', async ({ editPage, page }) => {
    await editPage.toggleActions();
    const copy = page.getByRole('button', { name: 'Copy Markdown', exact: true });
    await copy.click();
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toContain('mermaid.ink');
    await expect(page.getByText('Failed to copy')).toHaveCount(0);
  });
});
