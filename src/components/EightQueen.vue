<template>
  <div>
    <div class="title">
      八皇后问题
    </div>
    <div class="grid">
      <div class="row" v-for="(row, r_index) in grids" :key="r_index">
        <div 
          class="cell" 
          v-for="(cell, c_index) in row" 
          :key="c_index"
          @click.stop="() =>select(r_index, c_index)"
        >
          <div v-if="cell.ok">Q</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

const grids = new Array(8).fill(1).map((_,r) => {
  return new Array(8).fill(1).map((_, c) => {
    return {
      key: `key-${r*8+c}`,
      ok: false
    }
  }) 
})
export default {
  data () {
    return {
      grids
    }
  },
  methods: {
    select(r_index, c_index) {
      if (this.validate(r_index, c_index)) {
        this.grids[r_index][c_index].ok = ! this.grids[r_index][c_index].ok
      } else {
        alert('当前位置不能放置皇后')
      }
    },
    validate(rindex, cindex) {
      // 横
      for (let i = 0; i < this.grids[rindex].length; i++) {
        if (this.grids[rindex][i].ok) {
          return false;
        }
      }

      // 竖
      for (let i = 0; i < this.grids.length; i++) {
        if (this.grids[i][cindex].ok) {
          return false;
        }
      }

      // 撇
      for (let i = 0; i < this.grids[0].length; i++) {
        let y = rindex + cindex - i;
        if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
          return false;
        }
      }

      // 捺
      for (let i = 0; i < this.grids[0].length; i++) {
        let y = rindex - cindex + i;
        if (y >= 0 && y < this.grids.length && this.grids[y][i].ok) {
          return false;
        }
      }

      return true;
    }
  }
}
</script>
<style scoped>
  .grid {
    width: 400px;
    margin: 0 auto;
  }
  .cell {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #999;
    float: left;
  }
  .cell:nth-child(2n) {
    background: #efefef;
  }
  .row {
    width: 400px;
    height: 50px;
    display: flow-root;
  }
  .row:nth-child(2n) .cell:nth-child(2n) {
    background: #999999;
  }
   .row:nth-child(2n) .cell:nth-child(2n-1) {
    background: #efefef;
  }
</style>