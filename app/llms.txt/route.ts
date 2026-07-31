import { buildBio } from '@/lib/bio';

// Replaces the old static public/llms.txt so external crawlers get the same
// facts as the about page and the chat bot, from the same source.
export const dynamic = 'force-static';

export function GET() {
  const body = `# NoowaH — Hawoon Joh

> Personal site of Hawoon Joh (NOOWAH), a product engineer in Seoul. Available in English and Korean.

## Pages

- [Home (EN)](https://noowah.dev/en): Landing page and introduction
- [Home (KO)](https://noowah.dev/ko): 랜딩 페이지 및 소개
- [About (EN)](https://noowah.dev/en/about): Background, work, principles, and projects
- [About (KO)](https://noowah.dev/ko/about): 배경, 경력, 원칙, 프로젝트
- [Writing](https://velog.io/@henrynoowah/posts): Blog posts on velog

# About

${buildBio('en')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
