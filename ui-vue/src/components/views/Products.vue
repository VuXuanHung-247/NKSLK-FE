<template>
  <section class="content">
    <div class="row center-block">
      <h2>Danh sách Sản phẩm</h2>
      <div class="col-md-12">
        <div class="box">
          <!-- <div class="box-header">
            <h3 class="box-title">Data Table With Full Features</h3>
          </div> -->
          <div class="box-header">
            <button type="button" @click="addClick()" class="btn btn-primary" data-toggle="modal" data-target="#dialogModal">
              Thêm sản phẩm
            </button>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style="width: 140px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >Mã sản phẩm</th>
                        <th aria-label="Browser: activate to sort column ascending" style="width: 207px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >Tên sản phẩm</th>
                        <th aria-label="Browser: activate to sort column ascending" style="width: 100px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >Số đăng ký</th>
                        <th aria-label="Platform(s): activate to sort column ascending" style="width: 182px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >Hạn sử dụng</th>
                        <th aria-label="Engine version: activate to sort column ascending" style="width: 142px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >Quy cách</th>
                        <th aria-label="CSS grade: activate to sort column ascending" style="width: 100px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" >Ngày đăng ký</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- <tr class="even" role="row">
                        <td class="sorting_1">Blink</td>
                        <td>Iridium  54.0</td>
                        <td>GNU/Linux</td>
                        <td>54</td>
                        <td>A</td>
                        <td>14/10/2021</td>
                      </tr> -->
                      <tr
                        v-for="product in products" :key="product" class="even" role="row">
                        <td class="sorting_1">{{ product.ma_sanpham }}</td>
                        <td class="sorting_1">{{ product.tensanpham }}</td>
                        <td class="sorting_1">{{ product.sodangky }}</td>
                        <td class="sorting_1">{{ product.ngayhsd }} - {{ product.thanghsd }} - {{ product.namhsd }}</td>
                        <td class="sorting_1">{{ product.quycach }}</td>
                        <td class="sorting_1">{{ product.ngaydk }} - {{ product.thangdk }} - {{ product.namdk }}</td>
                        <td>
                          <i class="fa fa-pencil-square-o" data-toggle="modal" data-target="#dialogModal" @click="editClick(product)" style="font-size: 18px;"></i>
                          <i class="fa fa-trash-o" @click="deleteClick(product.ma_sanpham)"  style="margin-left:20px;font-size: 18px;"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
        <div class="modal fade" id="dialogModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Tên sản phẩm:
                <input type="text" class="form-control" v-model="tensanpham" placeholder="Tên sản phẩm" style="border-radius:3px">
              </div>
              <div class="modal-body">
                Số đăng ký:
                <input type="text" class="form-control" v-model="sodangky" placeholder="Số đăng ký" style="border-radius:3px">
              </div>
              <div class="modal-body">
                Hạn sử dụng:
                <date-picker v-model="hansudung" valueType="format" style="border-radius:3px">
                </date-picker>
              </div>
              <div class="modal-body">
                Quy cách:
                <input type="text" class="form-control" v-model="quycach" placeholder="Quy cách" style="border-radius:3px">
              </div>
              <div class="modal-body">
                Ngày đăng ký:
                <date-picker v-model="ngaydangky" valueType="format" style="border-radius:3px">
                </date-picker>
              </div>
              <div class="modal-footer">
                <button type="button" v-if="ma_sanpham ==0"  @click="createClick()" class="btn btn-primary">Thêm mới</button>
                <button type="button" v-if="ma_sanpham !=0"  @click="updateClick()" class="btn btn-primary">Sửa</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";
// import DatePicker from "vue2-datepicker";
// import 'vue2-datepicker/index.css';

export default {
  components: {  },
  name: 'Products',
  data() {
    return {
      products: [],
      ma_sanpham: 0,
      tensanpham: '',
      sodangky: 0,
      hansudung: Date,
      quycach: '',
      ngaydangky: Date,
      modalTitle: ''
    };
  },
  methods: {
    refreshData() {
      axios.get("http://localhost:43932/api/product").then((res) => {
        let data = res.data;
        for(var i = 0; i < data.length; i++) {
          const ngaydangky = new Date(data[i].ngaydangky);
          const hansudung = new Date(data[i].hansudung);
          data[i].ngaydk = ngaydangky.getDate();
          data[i].thangdk = ngaydangky.getMonth() + 1;
          data[i].namdk = ngaydangky.getFullYear();
          data[i].ngayhsd = hansudung.getDate();
          data[i].thanghsd = hansudung.getMonth() + 1;
          data[i].namhsd = hansudung.getFullYear();
        }
        this.products = data;
        });
      },
    addClick() {
      this.modalTitle="Thêm sản phẩm";
      this.ma_sanpham = 0;
      this.tensanpham = "";
      this.sodangky = 0;
      this.hansudung = "";
      this.quycach = "";
      this.ngaydangky = "";
    },
    editClick(product) {
      this.modalTitle = "Sửa sản phẩm";
      this.ma_sanpham = product.ma_sanpham;
      this.tensanpham = product.tensanpham;
      this.sodangky = product.sodangky;
      this.hansudung = product.hansudung;
      this.quycach = product.quycach;
      this.ngaydangky = product.ngaydangky;
    },
    createClick() {
      console.log(this.tensanpham, this.sodangky, this.hansudung, this.quycach, this.ngaydangky);
      axios
        .post("http://localhost:43932/api/product", {
          tensanpham: this.tensanpham,
          sodangky: this.sodangky,
          hansudung: this.hansudung,
          quycach: this.quycach,
          ngaydangky: this.ngaydangky
        })
        .then((res) => {
          this.refreshData();
          alert(res.data);
        })
        .catch(err => {
          console.log(err);
          this.errored = true
        });
    },
    updateClick(){
      axios.put("http://localhost:43932/api/product",{
          ma_sanpham: this.ma_sanpham,
          tensanpham: this.tensanpham,
          sodangky: this.sodangky,
          hansudung: this.hansudung,
          quycach: this.quycach,
          ngaydangky: this.ngaydangky
      })
      .then((res)=>{
          this.refreshData();
          alert(res.data);
      });
    },
    deleteClick(id) {
      if(!confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
          return;
      }
      axios.delete("http://localhost:43932/api/product/"+id)
      .then((res)=>{
          this.refreshData();
          alert(res.data);
      })
      .catch(err => {
          console.log(err)
          alert("Sản phẩm này không xoá được!");
          this.errored = true
        });
    },
  },
  mounted() {
    this.refreshData();
  },
};
</script>

<style>

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: '\f0dc';
}

table.dataTable thead .sorting_asc:after {
  content: '\f0dd';
}

table.dataTable thead .sorting_desc:after {
  content: '\f0de';
}
</style>
