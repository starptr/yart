import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

// Get a list of post names
function getPostsName(): string[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    // Remove ".md" from file name to get id
    const postsNames = fileNames.map(fileName => fileName.replace(/\.md$/, ''));
    return postsNames;
}

// Cache mapping dictionary
export type MdSlugDict = Map<string, string>;
// Get mapping dict itself
export function getMdToSlugDict(): MdSlugDict {
    let mdSlugDict = new Map();
    // Get posts (we only have posts for now)
    const postsNames = getPostsName();
    // Add posts to dict
    postsNames.forEach(id => mdSlugDict.set(id, `/p/${id}`));

    return mdSlugDict;
}

export interface PostData {
    date: string;
    title: string;
    id: string;
};

// Get a sorted list of posts metadatas
export function getSortedPostsData(): PostData[] {
  const postsNames = getPostsName();
  const allPostsData = postsNames.map(fileName => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}
