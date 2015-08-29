<settings>

  <h2>Settings</h2>
  <form action="#" method="post">
    <div>
      <label for="alias">User name</label><br/>
      <input name="alias" type="text" value="{ users.username }"/>
    </div>
    <input type="submit"/>
  </form>

  <form action="#" method="post">
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
    <input type="submit"/>
  </form>

  <script>
    var d = require('debug')('[v] settings.tag');

    d('loaded', opts);
  </script>

</settings>
