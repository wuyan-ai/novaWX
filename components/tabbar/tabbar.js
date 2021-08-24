Component({
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  data: {
    index: 0
  },

  methods: {
    change: function(e) {
      var index = e.currentTarget.dataset.index * 1
      var item = this.data.data.list[index]
      var choose = item.choose
      if (choose != 'disable') {
        this.setData({
          index: index
        })
      }
      this.triggerEvent('change', {
        flag:0,
        index: index
      })
    },
    },
})