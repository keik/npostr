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
      <posts-table/>
    </section>

  </div>

  <script>
    var d = require('debug')('[v] console-app.tag');

    d('loaded', opts);

    this.onClickMenu = function(e) {
      d('#onClickMenu', e);

      if (e.target.nodeName !== 'A') {
        return;
      }

      d('fire');
      switch (e.target.getAttribute('href')) {
        case '#all-posts':
          $('#main').innerHTML = '<posts-table/>';
          riot.mount('posts-table');
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
  </script>

</console-app>
