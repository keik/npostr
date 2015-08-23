<posts>
  <section>
    <h1>POSTS</h1>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Alias</th>
          <th>Title</th>
          <th>Created At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr each={ posts }>
          <td>{ id }</td>
          <td>{ alias }</td>
          <td>{ title }</td>
          <td>{ createdAt }</td>
          <td><button onclick={ destroy }>x</button></td>
        </tr>
      </tbody>
    </table>

  </section>
  <script>
    var d = require('./util').d('[v] posts');

    var self = this;
    var postsStore = opts.store;

    this.on('update', function() {
      d('#updated');
    });

    this.sync = function() {
      d('#sync');

      postsStore.fetch().then(function(res) {
        return res.text();
      }).then(function(body) {
        d('#sync success');
        self.update({posts: JSON.parse(body)});
      }).catch(function(e) {
        throw e;
      });
    }

    this.destroy = function(e) {
      d('#destroy');

      postsStore.destroy(e.item.id).then(function(res) {
        if (res.status === 200) {
          d('#destroy success');
          self.sync();
        }
      }).catch(function(e) {
        throw e;
      });
    }

    this.sync();
  </script>
</posts>
