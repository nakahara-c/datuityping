function makeTweet (level) {
    //const playingLevel = level;
    const playingLevel = 'LEVEL 1';
    const tweetButton = document.getElementById('tweet');
    
    const t = String((30 - parseFloat(timer.textContent)).toFixed(1));

    const c = count.textContent;
    const k = kpm.textContent;
    const hashTags = "脱衣タイピング"
    const tweet = `${playingLevel} cleared! ${c}keys in ${t} sec (${k}KPM) ＠脱衣タイピング（α）`;
    const url = 'https://example.com';

    const tweetText = `https://twitter.com/intent/tweet?ref_src=twsrc&text=${tweet}&hashtags=${hashTags}&url=${url}`;
    tweetButton.href = tweetText;
}

/* HTML

<!--ここからツイートボタン-->
<a class="button" id="tweet" href="https://twitter.com/intent/tweet?ref_src=twsrc&hashtags=脱衣タイピング&url=https://example.com">結果をツイート</a>

<!--
<a href="https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw"
    id="tweet" class="twitter-share-button" data-show-count="false"
    data-hashtags="脱衣タイピング"
    data-text="めっせーじ"
    data-size="large">Tweet #脱衣タイピング</a>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
-->

<!--ここまでツイートボタン-->

*/