<posts>
  <section class="post" each={ posts }>
    <h1>{title}</h1>
    <p>
      {createdAt}
    </p>
    <raw content={ htmlContent }></raw>
  </section>

  <script>
    var d = require('debug')('[v] posts.tag');

    require('./raw.tag');

    var self = this;
    var postsStore = opts.store;

    this.on('update', function() {
      d('#updated');
    });

    postsStore.fetch().then(function(res) {
      return res.text();
    }).then(function(body) {
      d('#fetch success');
      self.update({posts: JSON.parse(body)});

      // highlighting
      var codes = self.root.querySelectorAll('pre code');
      for (var i = 0, len = codes.length; i < len; i++) {
        global.hljs.highlightBlock(codes[i]);
      }
    }).catch(function(e) {
      throw e;
    });
  </script>
</posts>
