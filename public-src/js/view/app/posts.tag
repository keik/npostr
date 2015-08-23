<posts>
  <!--
  <post each={ post in posts } data={ post }></post>
  -->

  <section class="post" each={ posts }>
    <h1>{title}</h1>
    <raw content={ htmlizedContent }></raw>
  </section>

  <script>
    var d = require('./util').d('[v] posts');

    var self = this;
    var postsStore = opts.store;

    postsStore.fetch().then(function(res) {
      return res.text();
    }).then(function(body) {
      d('#fetch success');
      self.update({posts: JSON.parse(body)});
    }).catch(function(e) {
      throw e;
    });
  </script>
</posts>
