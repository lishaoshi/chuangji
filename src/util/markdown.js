import markdownIt from 'markdown-it'
import plusImagePlugin from 'markdown-it-plus-image'
import { baseURL } from '@/api'

export const markdown = markdownIt({
    html: true,
}).use(plusImagePlugin,`${baseURL}/files/`)


export function render (markdownText) {
    return markdown.render(String(markdownText))
}

export function syntaxTextAndImage (markdownText) {
    const html = render(markdownText)
    const imageHtmlCodes = html.match(/<img.*?(?:>|\/>)/gi)

    let images = []

    if (imageHtmlCodes instanceof Array) {
        imageHtmlCodes.forEach(function (imageHtmlCode) {
            /**
             * Match img HTML tag src attr.
             *
             * @type {Array}
             */
            let result = imageHtmlCode.match(/src=['"]?([^'"]*)['"]?/i)

            // If matched push to images array.
            if (result !== null && result[1]) {
                images.push(result[1])
            }
        })
    }

    const text = html
        .replace(/<img.*?(?:>|\/>)/gi, '[图片]') // Replace img HTML tag to "[图片]"
        .replace(/<\/?.+?>/gi, '') // Removed all HTML tags.
        .replace(/ /g, '')

    return { images, text }

}

export default render