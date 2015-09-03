<tab>
  <ul class="tab">
    <li each={ item in items } class={ active === item.id ? 'active' : '' }>
      <a href="#{ item.id }" onclick={ changeTab }>{ item.label }</a>
    </li>
  </ul>
  <yield/>

  <script>
    var d = require('debug')('[v] tab.tag');
    d('loaded', opts);

    var self = this;

    this.items = opts.items;
    this.active = opts.active;

    this.on('mount', showActiveOnly);

    this.changeTab = function(e) {
      self.root.querySelector('.active').classList.remove('active');
      this.root.classList.add('active');
      self.active = this.item.id;
      showActiveOnly();
    }

    function showActiveOnly() {
      for (var i = 0, len = self.root.children.length; i < len; i++) {
        child = self.root.children[i];
        if (child.classList.contains('tab') || child.id === self.active) {
          child.style.display = null;
        } else {
          child.style.display = 'none';
        }
      }
    }
  </script>
</tab>
