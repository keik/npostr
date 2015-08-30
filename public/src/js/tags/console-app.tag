<console-app>
  <div class="console-container">
    <section class="side">
      <nav>
        <ul id="menu" onclick={ onClickMenu }>
          <li><a href="#all-posts">All posts</a></li>
          <li><a href="#new-post">New post</a></li>
          <li class="separator"></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </nav>
    </section>
    <section id="main" class="main">
    </section>
  </div>

  <script>
    var d = require('debug')('[v] console-app.tag');
    d('loaded', opts);

    var self = this;

    /** inflate UI of a selected menu */
    this.onClickMenu = function(e) {
      d('#onClickMenu', e);

      // delegate event on `a` els
      if (e.target.nodeName !== 'A') {
        return;
      }

      switch (e.target.getAttribute('href')) {
        case '#all-posts':
          $('#main').innerHTML = '<posts-table/>';
          riot.mount('posts-table', {editPost: editPost});
          break;
        case '#new-post':
          $('#main').innerHTML = '<new-post/>';
          riot.mount('new-post');
          break;
        case '#settings':
          $('#main').innerHTML = '<settings/>';
          riot.mount('settings');
          break;
        default:
      }
    }

    /**
     * inflate UI of edit post
     * @param {String} id Post ID
     */
    function editPost(id) {
      d('#editPost');
      self.root.querySelector('#main').innerHTML = '<edit-post/>';
      fetch('/posts/' + id, {method: 'get'}).then(function(res) {
        return res.text();
      }).then(function(body) {
        riot.mount('edit-post', {post: JSON.parse(body)});
      });
    };
  </script>
</console-app>
