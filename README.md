# SiteFalconIOWidget

Site Falcon IO was a business ideas that I decided to make open source. It comprises a Web Component widget developed using raw HTML, JS and CSS. This repository is still in testing and not yet publicised.

The widget is a simple web component that can be embedded into any website and allows users to provide feedback by interacting with it. The feedback can also include screenshots of the website. This has proven to be the most challenging component of the project due to cross-origin content. The W3C spec that most browsers implement prohibits the downloading of content originating outside the origin of the current site-hosting server. Thus, any images on a website that are served from a different origin will taint any HTML canvases that are painted with their content. The work-around is to either use a proxy-server or the `getDisplayMedia` JS API. The latter requires asking for user permission each invocation which is sub-optimal. In summary, this project is still ongoing.

In its completed form, this widget will save web developers considerable time and hassle when it comes to ascertaining beta/alpha testing feedback from users because such users can provide feedback directly on the site, thus preventing bogged down email chain discussions.
