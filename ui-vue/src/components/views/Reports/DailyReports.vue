<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <lable class="col-lg-12 report-header" >Nhật ký sản lượng khoán làm riêng</lable>
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row" style="margin-left:0px">
                <div class="form-group" style="margin-right: 10px;">
                  <p>Tên công nhân:</p>
                  <input type="text" class="form-control" v-model="EmployeeNameFilter" v-on:keyup="FilterFn()" placeholder="Nhập Tên công nhân" style="border-radius:3px">
                </div>
                <div class="form-group">
                  <p>Ngày bắt đầu:</p>
                  <input type="date" class="form-control" v-model="StartDateFilter" v-on:keyup="FilterFn()"  style="border-radius:3px">
                </div>
                <div class="form-group" style="margin-right: 38px;float: right;">
                  <export-excel :data="reportsBySelf" :fields="excelFields" :name="excelName" style="display: flex; justify-content: space-between; margin-top: 15px; color: green; border: 1px solid; border-radius: 4px; padding: 8px 10px 0px 6px;">
                    <i class="fa fa-file-excel-o" style="margin-right: 10px;"></i>
                    <p style="line-height: 15px; font-size: 16px">Xuất file</p>
                  </export-excel>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th>Mã NKSLK</th>
                        <th>Mã công nhân </th>
                        <th>Tên công nhân </th>
                        <th>Ngày bắt đầu </th>
                        <th>Thời gian bắt đầu thực tế </th>
                        <th>Thời gian kết thúc thực tế </th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(reportSelf, index) in reportsBySelf" :key="'self' + index" 
                          v-show="index >= Page.FromPage && index < Page.ToPage" class="even" role="row" >
                        <td class="sorting_1">{{ reportSelf.ma_nkslk }}</td>
                        <td class="sorting_1">{{ reportSelf.ma_congnhan }}</td>
                        <td class="sorting_1">{{ reportSelf.hoten }}</td>
                        <td class="sorting_1">{{ reportSelf.ngaybatdau | formatDate}}</td>
                        <td class="sorting_1">{{ reportSelf.thoigian_batdau | formatDate}}</td>
                        <td class="sorting_1">{{ reportSelf.thoigian_ketthuc | formatDate}}</td>
                        <td>
                          <i class="fa fa-pencil-square-o" data-toggle="modal" data-target="#dialogModal" @click="editClick(reportSelf)" style="font-size: 18px;"></i> 
                          <i class="fa fa-trash-o" @click="deleteClick()"  style="opacity: 0.6;margin-left:20px;font-size: 18px;"></i>
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
        </div>
        <div class="box">
          <lable class="col-lg-12 report-header" >Nhật ký sản lượng khoán làm chung</lable>
          <div class="box-body">
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
                        <th>Thời gian bắt đầu thực tế </th>
                        <th>Thời gian kết thúc thực tế </th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(reportTogetther,index) in reportsByTogether" :key="'together '+index"
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
        <div class="box">
          <lable class="col-lg-12 report-header" >Nhật ký sản lượng khoán làm muộn</lable>
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th>Mã NKSLK</th>
                        <th>Mã công nhân </th>
                        <th>Tên công nhân </th>
                        <th>Thời gian bắt đầu ca làm việc </th>
                        <th>Thời gian bắt đầu thực tế </th>
                        <th>Thời gian kết thúc ca làm việc </th>
                        <th>Số phút muộn</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(reportByLate,index) in reportsByLate" :key="'late - ' + index"
                        v-show="index >= PageOfLate.FromPage && index < PageOfLate.ToPage" class="even" role="row">
                        <td>{{ reportByLate.ma_nkslk }}</td>
                        <td>{{ reportByLate.ma_congnhan }}</td>
                        <td>{{ reportByLate.hoten }}</td>
                        <td>{{ reportByLate.thoigian_batdau | formatDate}}</td>
                        <td>{{ reportByLate.thoigian_batdau1 | formatDate}}</td>
                        <td>{{ reportByLate.thoigian_ketthuc | formatDate}}</td>
                        <td>{{ reportByLate.sophutdimuon}}</td>
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
              <div class="paging-text">Hiển thị <span style="color:blue">{{PageOfLate.NumberRecords}}</span> trong tổng số <span style="color:blue">{{PageOfLate.TotalRecords}}</span> bản ghi</div>
              <div class="pagination">
                <a class="fa fa-angle-double-left" :class="{'blur':IsBlurPrev}" @click="PrevPageOfLate()" style="padding-top: 11px; padding-bottom: 11px;"></a>
                <a v-for="index in PageOfLate.TotalPages" :key="index" 
                  @click="choosePageOfLate(index)"
                  :class="{active: index === IsActive}">
                  {{index}}
                </a>
                <a class="fa fa-angle-double-right" :class="{'blur':IsBlurNext}" @click="NextPageOfLate()" style="padding-top: 11px; padding-bottom: 11px;"></a>
              </div>
              <div class="paging-text">Tổng số trang: <span style="color:blue">{{PageOfLate.TotalPages}}</span></div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="dialogModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header-flex" style="padding: 10px;">
                <label class="modal-title" id="exampleModalLabel" style="font-size:16px">{{modalTitle}}</label>
                 <i class="fa fa-times" data-dismiss="modal" aria-hidden="true" style="font-size:24px; color: rgb(141 136 136);"></i>
              </div>
              <div class="modal-body" style="height: 250px;">
                <div class="col-lg-6">
                  <div class="form-group">
                    <p>Mã NKSLK:</p>
                    <input type="text" class="form-control" v-model="nkslkId" placeholder="" disabled style="border-radius:3px">
                  </div>
                  <div class="form-group">
                    <p>Tên công nhân:</p>
                    <input type="text" class="form-control" v-model="EmployeeName" style="border-radius:3px">
                  </div>
                  
                  <div class="form-group">
                    <p>Thời gian bắt đầu ca thực tế</p>
                    <input type="datetime-local" class="form-control" v-model="StartTime" style="border-radius:3px">
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <p>Mã công nhân:</p>
                    <input type="text" class="form-control" v-model="EmployeeId" style="border-radius:3px">
                  </div>
                  <div class="form-group">
                    <p>Ngày bắt đầu</p>
                    <input type="datetime-local" class="form-control" v-model="StartDate" style="border-radius:3px">
                  </div>
                  
                  <div class="form-group">
                    <p>Thời gian kết thúc ca thực tế</p>
                    <input type="datetime-local" class="form-control" v-model="EndTime" style="border-radius:3px">
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <!-- <button type="button" v-if="ma_phongban ==0"  @click="createClick()" class="btn btn-primary">Thêm mới</button> -->
                <button type="button" v-if="nkslkId !=0"  @click="updateReportSelf()" class="btn btn-primary">Lưu</button>
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
      reportsByLate:[],
      EmployeeNameFilter:"",
      StartDateFilter:"",
      nkslkId: 0,
      EmployeeId: 0,
      EmployeeName:"",
      StartDate:"",
      StartTime:"",
      EndTime:"",
      IsShowReportBySelf: true,
      IsShowReportByTogether: false,
      IsShowReportByLate: false,
      Page:{CurrentPage:1, SizePage:5, TotalPages:0, FromPage:0, ToPage:5, NumberRecords:5, TotalRecords:0},
      PageOfTogether:{CurrentPage:1, SizePage:5, TotalPages:0, FromPage:0, ToPage:5, NumberRecords:5, TotalRecords:0},
      PageOfLate:{CurrentPage:1, SizePage:5, TotalPages:0, FromPage:0, ToPage:5, NumberRecords:5, TotalRecords:0},
      IsActive:1,
      IsBlurNext:false,
      IsBlurPrev:false,
      reportsBySelfFilter:[],
      excelName:"Nhật ký sản lượng khoán làm riêng",
      excelFields:{
        "Mã nkslk":'ma_nkslk',
        "Mã công nhân":'ma_congnhan',
        "Tên công nhân":'hoten',
        "Ngày bắt đầu":'ngaybatdau',
        "Thời gian bắt đầu ca làm việc":'thoigian_batdau',
        "Thời gian kết thúc ca làm việc":'thoigian_ketthuc'
      },
      modalTitle:"",
      urlAPI: "http://localhost:43932/api/report/",
      IsShowModal:false,
    };
  },
  methods: {
    getReportBySelf() {
      axios.get(this.urlAPI + "ReportBySelf").then((response) => {
        this.reportsBySelf = response.data;
        this.reportsBySelfFilter = response.data;
        // console.log("reports:",this.reportsBySelf);
        if (this.reportsBySelf != null && this.reportsBySelf != undefined) {
          this.Page.TotalRecords = this.reportsBySelf.length;
          this.Page.TotalPages = Math.ceil(this.Page.TotalRecords/this.Page.SizePage);
        }
      });
    },
    FilterFn(){
      var EmployeeNameFilter=this.EmployeeNameFilter;
      var StartDateFilter=this.StartDateFilter;

        this.reportsBySelf=this.reportsBySelfFilter.filter(
            function(el){
                return el.hoten.toString().toLowerCase().includes(
                    EmployeeNameFilter.toString().trim().toLowerCase()
                )&&
                el.ngaybatdau.toString().toLowerCase().includes(
                    StartDateFilter.toString().trim().toLowerCase()
                )
            });
    },
    getReportByTogether() {
      axios.get(this.urlAPI + "ReportByTogether").then((response) => {
        this.reportsByTogether = response.data;
        if (this.reportsByTogether != null && this.reportsByTogether != undefined) {
          this.PageOfTogether.TotalRecords = this.reportsByTogether.length;
          this.PageOfTogether.TotalPages = Math.ceil(this.PageOfTogether.TotalRecords/this.PageOfTogether.SizePage);
        }
      });
    },
    getReportByLate() {
      axios.get(this.urlAPI + "ReportByLate").then((response) => {
        this.reportsByLate = response.data;
        if (this.reportsByLate != null && this.reportsByLate != undefined) {
          this.PageOfLate.TotalRecords = this.reportsByLate.length;
          this.PageOfLate.TotalPages = Math.ceil(this.PageOfLate.TotalRecords/this.PageOfLate.SizePage);
        }
      });
    },
    editClick(reportSelf){
            this.IsShowModal = true;
            this.modalTitle="Cập nhật nhật ký sản lượng khoán";
            this.nkslkId=reportSelf.ma_nkslk;
            this.EmployeeId=reportSelf.ma_congnhan;
            this.EmployeeName=reportSelf.hoten;
            this.StartDate=reportSelf.ngaybatdau;
            this.StartTime=reportSelf.thoigian_batdau;
            this.EndTime=reportSelf.thoigian_ketthuc;
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
    updateReportSelf(){
            axios.put(this.urlAPI + "UpdateReportSelf",{
                ma_nkslk:this.nkslkId,
                ma_congnhan:this.EmployeeId,
                hoten:this.EmployeeName,
                ngaybatdau:this.StartDate,
                thoigian_batdau:this.StartTime,
                thoigian_ketthuc:this.EndTime
            })
            .then((response)=>{
              this.IsShowModal = false;
                alert(response.data);
                this.getReportBySelf();
            });
    },
    deleteClick(){
      alert("Bạn không có quyền xóa NKSLK. Vui lòng liên hệ cấp trên !");
            // if(!confirm("Bạn chắc chắn muốn xóa phòng ban này?")){
            //     return;
            // }
            // axios.delete("http://localhost:43932/api/phongban/"+id)
            // .then((response)=>{
            //     this.refreshData();
            //     alert(response.data);
            // })
            // .catch(error => {
            //     console.log(error)
            //     alert("Phòng ban này còn công nhân hoạt động. Không được xóa !");
            //     this.errored = true
            // });
    },
    chooseReportBySelf(){
      this.IsShowReportBySelf = true;
      this.IsShowReportByTogether = false;
      this.IsShowReportByLate = false;
    },
    chooseReportByTogether(){
      this.IsShowReportByTogether = true;
      this.IsShowReportBySelf = false;
      this.IsShowReportByLate = false;
    },
    chooseReportByLate(){
      this.IsShowReportByLate = true;
      this.IsShowReportBySelf = false;
      this.IsShowReportByTogether = false;
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
    },
    // Phân trang nkslk làm muộn
    getCurrentPageOfLate(currentPage){
      this.PageOfLate.FromPage = (currentPage- 1) *  this.PageOfLate.SizePage;
      this.PageOfLate.ToPage = currentPage * this.PageOfLate.SizePage;
      var modRecord = this.PageOfLate.TotalRecords % this.PageOfLate.SizePage;
      if(this.PageOfLate.ToPage > this.PageOfLate.TotalRecords && modRecord !== 0){
        this.PageOfLate.NumberRecords = modRecord;
      }
      else{
        this.PageOfLate.NumberRecords = 5;
      }
    },
    NextPageOfLate(){
      this.PageOfLate.CurrentPage ++;
      if(this.PageOfLate.CurrentPage >= this.PageOfLate.TotalPages){
        this.PageOfLate.CurrentPage = this.PageOfLate.TotalPages;
      }
      if(this.PageOfLate.CurrentPage === this.PageOfLate.TotalPages){
        this.IsBlurNext = true;
      }
      this.IsBlurPrev = false;
      this.IsActive = this.PageOfLate.CurrentPage;
      this.getCurrentPageOfLate(this.PageOfLate.CurrentPage);
    },
    PrevPageOfLate(){
      this.PageOfLate.CurrentPage --;
      if(this.PageOfLate.CurrentPage <= 1){
        this.PageOfLate.CurrentPage = 1;
      }
      if(this.PageOfLate.CurrentPage === 1){
        this.IsBlurPrev = true;
      }
      this.IsBlurNext = false;
      this.IsActive = this.PageOfLate.CurrentPage;
       this.getCurrentPageOfLate(this.PageOfLate.CurrentPage);
    },
    choosePageOfLate(index){
      this.IsActive = index;
      this.IsBlurPrev = false;
      this.IsBlurNext = false;
      this.PageOfLate.CurrentPage = index;
      this.getCurrentPageOfLate(this.PageOfLate.CurrentPage);
    },
    loadData(){
    this.getReportBySelf();
    this.getReportByTogether();
    this.getReportByLate();
    }
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm')
      }
    },
  },
  created() {
    this.loadData();
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
  background-color: #3c8dbc;
  color:#fff;
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
.box{
  margin-bottom: 10px;
    padding: 10px;
}
.report-header{
   padding-left: 10px;
   margin-bottom: 10px;
    font-size: 16px;
    color: #fff;
    background-color: rgb(60 188 111);
    padding: 5px;
    border-radius: 2px;
}
.paging{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  display: inline-block;
  margin: 8px;
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
.modal-header-flex{
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
