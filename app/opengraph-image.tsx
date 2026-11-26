import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const dynamic = 'force-static';
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social sharing card, generated at build time. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f8f7f3', color: '#1f2328', padding: '72px 80px', fontFamily: 'serif' }}>
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 4, color: '#35598a', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
          {site.position}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 40, marginTop: 24, color: '#4b5260' }}>{site.headline}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 24, color: '#7a808c', fontFamily: 'sans-serif' }}>
          <div style={{ display: 'flex', width: 120, height: 4, background: '#35598a' }} />
          mammarifateh.github.io
        </div>
      </div>
    ),
    size,
  );
}
