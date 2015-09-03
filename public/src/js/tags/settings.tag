<settings>

  <h1>Settings</h1>

  <tab items={ tabItems } active={ 'profile' }>

    <section id="profile">
      <h2>Profile</h2>
      <form action="#" method="post">
        <div>
          <img style="width: 80px; height: 80px; background-color: gray"/><br/>
          <input type="file" name="user-image"/>
        </div>
        <div>
          <label for="alias">User name</label><br/>
          <input name="alias" type="text" value="{ users.username }"/>
        </div>
        <section>
          <h3>Password</h3>
          <div>
            <label for="old-password">Old password</label><br/>
            <input name="old-password" type="password"/>
          </div>
          <div>
            <label for="password">New Password</label><br/>
            <input name="password" type="password"/>
          </div>
          <div>
            <label for="password-confirmation">Confirm new Password</label><br/>
            <input name="password-confirmation" type="password"/>
          </div>
          <button class="btn btn-primary">Update</button>
        </section>
      </form>
    </section>

    <section id="looks">
      <h2>Looks</h2>
      <form>
        <div>
          <label for="max-posts">Max posts</label><br/>
          <input id="max-posts" name="max-posts" type="number"/>
        </div>
        <div>
          <label for="header-html">Header HTML</label><br/>
          <textarea id="header-html" name="header-html"/>
        </div>
        <div>
          <label for="footer-html">Footer HTML</label><br/>
          <textarea id="footer-html" name="footer-html"/>
        </div>
        <buton class="btn btn-primary">Update</buton>
      </form>
    </section>

  </tab>

  <script>
    var d = require('debug')('[v] settings.tag');

    this.tabItems = [
      { id: 'profile', label: 'Profile'},
      { id: 'looks', label: 'Looks' }
    ];

    d('loaded', opts);
  </script>

</settings>
