<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="col-md-12 box-header" style="display: flex; justify-content: flex-start;">
            <div class="nkslk-tabs" @click="chooseReportBySelf()" >Nhật ký sản lượng khoán làm riêng</div>
            <div class="nkslk-tabs" @click="chooseReportByTogether()" >Nhật ký sản lượng khoán làm chung</div>
            <!-- <button type="button" @click="addClick()" class="btn btn-primary" data-toggle="modal" data-target="#dialogModal">
              Thêm phòng ban
            </button> -->
          </div>
          <!-- Nhật ký sản lượng khoán làm riêng -->
          <div class="box-body" v-if="IsShowBySelf">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th>Mã NKSLK</th>
                        <th>Mã công nhân </th>
                        <th>Tên công nhân </th>
                        <th>Ngày bắt đầu </th>
                        <th>Thời gian bắt đầu ca làm việc </th>
                        <th>Thời gian kết thúc ca làm việc </th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(reportSelf, index) in reportsBySelf" :key="reportSelf.ma_nkslk" 
                          v-show="index >= Page.FromPage && index < Page.ToPage" class="even" role="row" >
                        <td class="sorting_1">{{ reportSelf.ma_nkslk }}</td>
                        <td class="sorting_1">{{ reportSelf.ma_congnhan }}</td>
                        <td class="sorting_1">{{ reportSelf.hoten }}</td>
                        <td class="sorting_1">{{ reportSelf.ngaybatdau | formatDate}}</td>
                        <td class="sorting_1">{{ reportSelf.thoigian_batdau | formatDate}}</td>
                        <td class="sorting_1">{{ reportSelf.thoigian_ketthuc | formatDate}}</td>
                        <td>
                          <i class="fa fa-pencil-square-o" data-toggle="modal" data-target="#dialogModal" @click="editClick(dep)" style="font-size: 18px;"></i> 
                          <i class="fa fa-trash-o" @click="deleteClick(dep.ma_phongban)"  style="margin-left:20px;font-size: 18px;"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="paging">
              <div class="paging-text">Hiển thị <span style="color:blue">{{Page.NumberRecords}}</span> trong tổng số <span style="color:blue">{{Page.TotalRecords}}</span> bản ghi</div>
              <div class="pagination">
                <a class="fa fa-angle-double-left" :class="{'blur':IsBlurPrev}" @click="PrevPage()" style="padding-top: 11px; padding-bottom: 11px;"></a>
                <a v-for="index in Page.TotalPages" :key="index" 
                  @click="choosePage(index)"
                  :class="{active: index === IsActive}">
                  {{index}}
                </a>
                <a class="fa fa-angle-double-right" :class="{'blur':IsBlurNext}" @click="NextPage()" style="padding-top: 11px; padding-bottom: 11px;"></a>
              </div>
              <div class="paging-text">Tổng số trang: <span style="color:blue">{{Page.TotalPages}}</span></div>
            </div>
          </div>
          <!-- Nhật ký sản lượng khoán làm chung -->
          <div class="box-body" v-if="!IsShowBySelf">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th>Mã NKSLK</th>
                        <th>Mã công nhân </th>
                        <th>Tên công nhân </th>
                        <th>Ngày bắt đầu </th>
                        <th>Thời gian bắt đầu ca làm việc </th>
                        <th>Thời gian kết thúc ca làm việc </th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(reportTogetther,index) in reportsByTogether" :key="reportTogetther.ma_nkslk"
                        v-show="index >= PageOfTogether.FromPage && index < PageOfTogether.ToPage" class="even" role="row">
                        <td>{{ reportTogetther.ma_nkslk }}</td>
                        <td>{{ reportTogetther.ma_congnhan }}</td>
                        <td>{{ reportTogetther.hoten }}</td>
                        <td>{{ reportTogetther.ngaybatdau | formatDate}}</td>
                        <td>{{ reportTogetther.thoigian_batdau | formatDate}}</td>
                        <td>{{ reportTogetther.thoigian_ketthuc | formatDate}}</td>
                        <td>
                          <i class="fa fa-pencil-square-o" data-toggle="modal" data-target="#dialogModal" @click="editClick(dep)" style="font-size: 18px;"></i> 
                          <i class="fa fa-trash-o" @click="deleteClick(dep.ma_phongban)"  style="margin-left:20px;font-size: 18px;"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="paging">
              <div class="paging-text">Hiển thị <span style="color:blue">{{PageOfTogether.NumberRecords}}</span> trong tổng số <span style="color:blue">{{PageOfTogether.TotalRecords}}</span> bản ghi</div>
              <div class="pagination">
                <a class="fa fa-angle-double-left" :class="{'blur':IsBlurPrev}" @click="PrevPageOfTogether()" style="padding-top: 11px; padding-bottom: 11px;"></a>
                <a v-for="index in PageOfTogether.TotalPages" :key="index" 
                  @click="choosePageOfTogether(index)"
                  :class="{active: index === IsActive}">
                  {{index}}
                </a>
                <a class="fa fa-angle-double-right" :class="{'blur':IsBlurNext}" @click="NextPageOfTogether()" style="padding-top: 11px; padding-bottom: 11px;"></a>
              </div>
              <div class="paging-text">Tổng số trang: <span style="color:blue">{{PageOfTogether.TotalPages}}</span></div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
        
        

        <!-- Modal -->
        <div class="modal fade" id="dialogModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <!-- <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5> -->
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Tên phòng ban:
                <!-- <input type="text" class="form-control" v-model="ten_phongban" placeholder="" style="border-radius:3px"> -->
              </div>
              <div class="modal-footer">
                <!-- <button type="button" v-if="ma_phongban ==0"  @click="createClick()" class="btn btn-primary">Thêm mới</button>
                <button type="button" v-if="ma_phongban !=0"  @click="updateClick()" class="btn btn-primary">Sửa</button> -->
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
export default {
  name: "Departments",
  data() {
    return {
      reportsBySelf: [],
      reportsByTogether: [],
      nkslkId: 0,
      EmployeeId: 0,
      EmployeeName:"",
      StartDate:"",
      StartTime:"",
      EndTime:"",
      IsShowBySelf: true,
      Page:{CurrentPage:1, SizePage:5, TotalPages:0, FromPage:0, ToPage:5, NumberRecords:5, TotalRecords:0},
      PageOfTogether:{CurrentPage:1, SizePage:5, TotalPages:0, FromPage:0, ToPage:5, NumberRecords:5, TotalRecords:0},
      IsActive:1,
      IsBlurNext:false,
      IsBlurPrev:false
    };
  },
  methods: {
    getReportBySelf() {
      axios.get("http://localhost:43932/api/report/ReportBySelf").then((response) => {
        this.reportsBySelf = response.data;
        // console.log("reports:",this.reportsBySelf);
        if (this.reportsBySelf != null && this.reportsBySelf != undefined) {
          this.Page.TotalRecords = this.reportsBySelf.length;
          this.Page.TotalPages = Math.ceil(this.Page.TotalRecords/this.Page.SizePage);
        }
      });
    },
    getReportByTogether() {
      axios.get("http://localhost:43932/api/report/ReportByTogether").then((response) => {
        this.reportsByTogether = response.data;
        if (this.reportsByTogether != null && this.reportsByTogether != undefined) {
          this.PageOfTogether.TotalRecords = this.reportsByTogether.length;
          this.PageOfTogether.TotalPages = Math.ceil(this.PageOfTogether.TotalRecords/this.PageOfTogether.SizePage);
          var a = this.PageOfTogether.TotalPages;
        }
      });
    },
    addClick(){
            this.modalTitle="Thêm phòng ban";
            this.ma_phongban=0;
            this.ten_phongban="";
        },
    editClick(dep){
            this.modalTitle="Sửa phòng ban";
            this.ma_phongban=dep.ma_phongban;
            this.ten_phongban=dep.ten_phongban;
        },
    createClick() {
      axios
        .post("http://localhost:43932/api/phongban", {
          ten_phongban: this.ten_phongban,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    updateClick(){
            axios.put("http://localhost:43932/api/phongban",{
                ma_phongban:this.ma_phongban,
                ten_phongban:this.ten_phongban
            })
            .then((response)=>{
                this.refreshData();
                alert(response.data);
            });
    },
    deleteClick(id){
            if(!confirm("Bạn chắc chắn muốn xóa phòng ban này?")){
                return;
            }
            axios.delete("http://localhost:43932/api/phongban/"+id)
            .then((response)=>{
                this.refreshData();
                alert(response.data);
            })
            .catch(error => {
                console.log(error)
                alert("Phòng ban này còn công nhân hoạt động. Không được xóa !");
                this.errored = true
            });
    
    },
    chooseReportBySelf(){
      this.IsShowBySelf =true;
    },
    chooseReportByTogether(){
      this.IsShowBySelf =false;
      this.getReportByTogether();
    },

    // Phân trang nkslk làm riêng
    getCurrentPage(currentPage){
      this.Page.FromPage = (currentPage- 1) *  this.Page.SizePage;
      this.Page.ToPage = currentPage * this.Page.SizePage;
      var modRecord = this.Page.TotalRecords % this.Page.SizePage;
      if(this.Page.ToPage > this.Page.TotalRecords && modRecord !== 0){
        this.Page.NumberRecords = modRecord;
      }
      else{
        this.Page.NumberRecords = 5;
      }
    },
    NextPage(){
      this.Page.CurrentPage ++;
      if(this.Page.CurrentPage >= this.Page.TotalPages){
        this.Page.CurrentPage = this.Page.TotalPages;
      }
      if(this.Page.CurrentPage === this.Page.TotalPages){
        this.IsBlurNext = true;
      }
      this.IsBlurPrev = false;
      this.IsActive = this.Page.CurrentPage;
      this.getCurrentPage(this.Page.CurrentPage);
    },
    PrevPage(){
      this.Page.CurrentPage --;
      if(this.Page.CurrentPage <= 1){
        this.Page.CurrentPage = 1;
      }
      if(this.Page.CurrentPage === 1){
        this.IsBlurPrev = true;
      }
      this.IsBlurNext = false;
      this.IsActive = this.Page.CurrentPage;
       this.getCurrentPage(this.Page.CurrentPage);
    },
    choosePage(index){
      this.IsActive = index;
      this.IsBlurPrev = false;
      this.IsBlurNext = false;
      this.Page.CurrentPage = index;
      this.getCurrentPage(this.Page.CurrentPage);
    },
    // Phân trang nkslk làm chung
    getCurrentPageOfTogether(currentPage){
      this.PageOfTogether.FromPage = (currentPage- 1) *  this.PageOfTogether.SizePage;
      this.PageOfTogether.ToPage = currentPage * this.PageOfTogether.SizePage;
      var modRecord = this.PageOfTogether.TotalRecords % this.PageOfTogether.SizePage;
      if(this.PageOfTogether.ToPage > this.PageOfTogether.TotalRecords && modRecord !== 0){
        this.PageOfTogether.NumberRecords = modRecord;
      }
      else{
        this.PageOfTogether.NumberRecords = 5;
      }
    },
    NextPageOfTogether(){
      this.PageOfTogether.CurrentPage ++;
      if(this.PageOfTogether.CurrentPage >= this.PageOfTogether.TotalPages){
        this.PageOfTogether.CurrentPage = this.PageOfTogether.TotalPages;
      }
      if(this.PageOfTogether.CurrentPage === this.PageOfTogether.TotalPages){
        this.IsBlurNext = true;
      }
      this.IsBlurPrev = false;
      this.IsActive = this.PageOfTogether.CurrentPage;
      this.getCurrentPageOfTogether(this.PageOfTogether.CurrentPage);
    },
    PrevPageOfTogether(){
      this.PageOfTogether.CurrentPage --;
      if(this.PageOfTogether.CurrentPage <= 1){
        this.PageOfTogether.CurrentPage = 1;
      }
      if(this.PageOfTogether.CurrentPage === 1){
        this.IsBlurPrev = true;
      }
      this.IsBlurNext = false;
      this.IsActive = this.PageOfTogether.CurrentPage;
       this.getCurrentPageOfTogether(this.PageOfTogether.CurrentPage);
    },
    choosePageOfTogether(index){
      this.IsActive = index;
      this.IsBlurPrev = false;
      this.IsBlurNext = false;
      this.PageOfTogether.CurrentPage = index;
      this.getCurrentPageOfTogether(this.PageOfTogether.CurrentPage);
    }
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm')
      }
    },
  },
  mounted() {
    this.getReportBySelf();
  },
};
</script>

<style>

.nkslk-tabs{
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 5px;
  margin-right: 10px;
  font-size: 16px;
}
.nkslk-tabs:hover{
  background-color: #ecf0f5;
}
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url("/static/js/plugins/datatables/dataTables.bootstrap.css");

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: "FontAwesome";
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}

.paging{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
}

.pagination a.active {
  background-color: #3c8dbc;
  color: white;
  border: 1px solid #3c8dbc;
}

.pagination a:hover:not(.active) {background-color: #ddd;}
.blur{
  opacity: 0.4;
}
</style>
