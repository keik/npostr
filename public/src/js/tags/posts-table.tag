<posts-table>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>ID</th>
        <th>Alias</th>
        <th>Title</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr each={ posts }>
        <td><input type="checkbox"/></td>
        <td>{ id }</td>
        <td>{ alias }</td>
        <td>{ title }</td>
        <td>{ createdAt }</td>
        <td><button class="btn" onclick={ edit }>Edit</button> <button class="btn btn-danger" onclick={ destroy }>delete</button></td>
      </tr>
    </tbody>
  </table>

  <script>
    var d = require('debug')('[v] posts-table.tag');
    d('loaded', opts);

    var self = this;

    var postsStore = require('../stores/posts.js');
    this.on('update', function() {
      d('#updated');
    });

    this.sync = function() {
      d('#sync');

      postsStore.fetch({count: 100}).then(function(res) {
        return res.text();
      }).then(function(body) {
        d('#sync success');
        self.update({posts: JSON.parse(body)});
      }).catch(function(e) {
        throw e;
      });
    }

    this.edit = function(e) {
      d('#edit');
      if (typeof opts.editPost !== 'function')
        throw new Error('posts-table.tag must have `editPost` function in opts');
      opts.editPost(this.id);
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
</posts-table>
