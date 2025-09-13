# API埋め込みコード集

## 1. 基本的なiframe埋め込みコード

```html
<!-- 単一の動画を埋め込む場合 -->
<iframe 
    src="https://www.youtube.com/embed/utyAbJRBfv4" 
    width="560" 
    height="315" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
```

## 2. JavaScriptでAPIから動画を取得してiframeで表示

```html
<div id="video-container"></div>

<script>
async function loadVideos() {
    try {
        const response = await fetch('https://my-api-proxy-xi.vercel.app/api/sheets?sheet=motegi&limit=10');
        const data = await response.json();
        
        if (data.ok && data.items) {
            const container = document.getElementById('video-container');
            
            data.items.forEach(video => {
                // タイトル
                const title = document.createElement('h3');
                title.textContent = video.title;
                container.appendChild(title);
                
                // YouTube埋め込みiframe
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${video.videoId}`;
                iframe.width = '560';
                iframe.height = '315';
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.style.margin = '10px';
                
                container.appendChild(iframe);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ページ読み込み時に実行
loadVideos();
</script>
```

## 3. レスポンシブなiframe埋め込み

```html
<div class="video-wrapper">
    <iframe 
        src="https://www.youtube.com/embed/utyAbJRBfv4" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
</div>

<style>
.video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 アスペクト比 */
    height: 0;
    overflow: hidden;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
```

## 4. WordPressやCMS用の短縮コード

```html
<!-- WordPressのショートコード風 -->
<div class="youtube-videos" data-sheet="motegi" data-limit="5"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.youtube-videos');
    
    containers.forEach(container => {
        const sheet = container.dataset.sheet || 'motegi';
        const limit = container.dataset.limit || '10';
        
        fetch(`https://my-api-proxy-xi.vercel.app/api/sheets?sheet=${sheet}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                if (data.ok && data.items) {
                    data.items.forEach(video => {
                        const iframe = document.createElement('iframe');
                        iframe.src = `https://www.youtube.com/embed/${video.videoId}`;
                        iframe.width = '100%';
                        iframe.height = '315';
                        iframe.frameBorder = '0';
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                        iframe.allowFullscreen = true;
                        iframe.style.marginBottom = '20px';
                        
                        container.appendChild(iframe);
                    });
                }
            });
    });
});
</script>
```

## 5. 特定の動画IDを指定した埋め込み

```html
<!-- 動画ID: utyAbJRBfv4 -->
<iframe 
    src="https://www.youtube.com/embed/utyAbJRBfv4" 
    width="560" 
    height="315" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>

<!-- 動画ID: VG9_oTgrDBQ -->
<iframe 
    src="https://www.youtube.com/embed/VG9_oTgrDBQ" 
    width="560" 
    height="315" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>

<!-- 動画ID: Ug9Bjt72tcc -->
<iframe 
    src="https://www.youtube.com/embed/Ug9Bjt72tcc" 
    width="560" 
    height="315" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
```

## APIレスポンス例

```json
{
  "ok": true,
  "sheet": "motegi",
  "updatedAt": "2025-09-12 21:33:27",
  "count": 3,
  "items": [
    {
      "videoId": "utyAbJRBfv4",
      "title": "ユーキャン社長が語る、AI×教育の未来",
      "publishedAt": "2025-09-12T11:01:46.000Z",
      "durationSec": 50,
      "thumbnail": "https://img.youtube.com/vi/utyAbJRBfv4/hqdefault.jpg",
      "url": "https://www.youtube.com/watch?v=utyAbJRBfv4"
    }
  ]
}
```
