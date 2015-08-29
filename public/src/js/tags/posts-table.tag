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
        <td><button onclick={ edit }>Edit</button> <button onclick={ destroy }>delete</button></td>
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

      postsStore.fetch().then(function(res) {
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

      $('console-app .main').innerHTML = '<edit-post/>';

      fetch('/posts/' + this.id, {method: 'get'}).then(function(res) {
        return res.text();
      }).then(function(body) {
        riot.mount('edit-post', {post: JSON.parse(body)});
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
</posts-table>
