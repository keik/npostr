<new-post>
  <h2>New post</h2>
  <form class="new-post-form" action="/posts" method="post">
    <div>
      <label for="alias">alias</label><br/>
      <input name="alias" type="text"/>
    </div>
    <div>
      <label for="title">title</label><br/>
      <input name="title" type="text"/>
    </div>
    <div class="editor">
      <div class="editor-area">
        <label for="content">Editor</label><br/>
        <textarea id="editor-plain" name="content" onkeyup={ onKeyupEditor }></textarea>
      </div>
      <div class="separator">
      </div>
      <div class="editor-area">
        <label for="content">Preview</label><br/>
        <div id="editor-rendered"></div>
      </div>
    </div>
    <button class="btn btn-primary">Create</button>
  </form>

  <script>
    var d = require('debug')('[v] new-post.tag');

    var marked = require('marked');

    d('loaded', opts);

    /** rendering timer */
    var timer;

    /**
     * Render Markdown
     */
    this.onKeyupEditor = function(e) {
      // supress excessive rendering
      if (timer) return;

      timer = setTimeout(function() {
        $('#editor-rendered').innerHTML = marked(e.target.value);
        timer = null;
      }, 200);
    };

  </script>

</new-post>
