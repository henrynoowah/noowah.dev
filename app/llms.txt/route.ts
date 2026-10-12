import { buildBio } from '@/lib/bio';
import { blogUrls } from '@/lib/blog';

// Replaces the old static public/llms.txt so external crawlers get the same
// facts as the about page and the chat bot, from the same source.
export const dynamic = 'force-static';

export function GET() {
  const body = `# NOOWAH — Hawoon Joh

> Personal site of Hawoon Joh (NOOWAH), a product engineer in Seoul. Available in English and Korean.

## Pages

- [Home (EN)](https://noowah.dev/en): Landing page and introduction
- [Home (KO)](https://noowah.dev/ko): 랜딩 페이지 및 소개
- [About (EN)](https://noowah.dev/en/about): Background, work, principles, and projects
- [About (KO)](https://noowah.dev/ko/about): 배경, 경력, 원칙, 프로젝트
- [Synolink CMS (EN)](https://noowah.dev/en/work/synolink-cms): Case study of cms.synolink.ai
- [Synolink CMS (KO)](https://noowah.dev/ko/work/synolink-cms): cms.synolink.ai 케이스 스터디
- [Side projects (EN)](https://noowah.dev/en/work/side-projects): content-builder (the core of Synolink CMS), shadcn/ui RJSF Form Builder, node-pr-versioning
- [Side projects (KO)](https://noowah.dev/ko/work/side-projects): 사이드 프로젝트
- [Writing (EN)](${blogUrls.en}): Blog posts in English
- [Writing (KO)](${blogUrls.ko}): 블로그 글 (한국어)

# About

${buildBio('en')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
