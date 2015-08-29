<edit-post>
  <h2>Edit post</h2>
  <form class="edit-post-form" action="/posts/{ post.id }" method="post">
    <input type="hidden" name="method" value="update"/>
    <div>
      <label for="alias">alias</label><br/>
      <input name="alias" type="text" value={ post.alias }/>
    </div>
    <div>
      <label for="title">title</label><br/>
      <input name="title" type="text" value={ post.title }/>
    </div>
    <div class="editor">
      <div class="editor-area">
        <label for="content">Editor</label><br/>
        <textarea id="editor-plain" name="content" onkeyup={ onKeyupEditor }>{ post.content }</textarea>
      </div>
      <div class="separator">
      </div>
      <div class="editor-area">
        <label for="content">Preview</label><br/>
        <div id="editor-rendered"></div>
      </div>
    </div>
    <input type="submit" value="update"/>
  </form>

  <script>
    var d = require('debug')('[v] edit-post.tag');

    var marked = require('marked');

    d('loaded', opts);

    this.post = opts.post;

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

</edit-post>
