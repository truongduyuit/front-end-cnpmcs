import {
    Component,
    Injector,
    ViewChild,
    ViewEncapsulation,
    AfterViewInit,
    OnInit,
} from "@angular/core";
// import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { AppComponentBase } from "@shared/common/app-component-base";

import {
    LoaiXeGroup4Dto,
    LoaiXeGroup4ServiceProxy,
    XeGroup4Dto,
    XeGroup4ServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { Table } from "primeng/components/table/table";
import { Paginator } from "primeng/primeng";

@Component({
    templateUrl: "./car-list.component.html",
    styleUrls: ["./car.component.less"],
    // encapsulation: ViewEncapsulation.None,
})
export class CarListComponent extends AppComponentBase
    implements AfterViewInit, OnInit {
    /**
     *
     */
    @ViewChild("dataTable") dataTable: Table;
    @ViewChild("paginator") paginator: Paginator;

    constructor(injector: Injector, private xeGroup4Service: XeGroup4ServiceProxy, private loaiXeGroup4Service: LoaiXeGroup4ServiceProxy) {
        super(injector);
        this.currentUserName = this.appSession.user.userName;
        // this.carService.getCurrentUserName().subscribe(response=>{
        //   this.currentUserName = response;
        // })
    }
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
        this.getCarType();
        this.search();
    }
    carTypeInput: LoaiXeGroup4Dto = new LoaiXeGroup4Dto();
    carTypeRecords: LoaiXeGroup4Dto[] = [];

    carFilterInput: XeGroup4Dto = new XeGroup4Dto();
    carRecords: XeGroup4Dto[] = [];

    currentId: number;
    currentUserName: string;

    getCarType() {
        const { ma, loaiXe_Ten } = this.carTypeInput;
        this.loaiXeGroup4Service.lOAIXE_Group4Search(ma, loaiXe_Ten)
            .subscribe((result) => {
                result.length < 1 && this.notify.error("Không tìm thấy dữ liệu loại xe");
                this.carTypeRecords = result;
            });
    }

    // delete() {
    //     this.notify.success("Chưa có api");
    //     this.carService.cAR_Del(this.currentId).subscribe((response) => {
    //         if (response["Result"] == "-1") {
    //             this.notify.error(response["ErrorDesc"]);
    //         } else {
    //             this.notify.success("Xóa thành công");
    //             this.search();
    //         }
    //     });
    // }

    search(): void {
        const { ma, xe_Ten } = this.carFilterInput;
        // show loading trong gridview
        console.log("this.carTypeInput.ma", this.carTypeInput.ma);
        this.primengTableHelper.showLoadingIndicator();
        this.xeGroup4Service.xE_Group4Search(ma, xe_Ten, this.carTypeInput.ma)
            .subscribe((result) => {
                let no = 1;
                result.forEach((item) => {
                    item["no"] = no++;
                });
                result.length < 1 && this.notify.error("Không tìm thấy dữ liệu");
                this.primengTableHelper.totalRecordsCount = result.length;
                this.primengTableHelper.records = result;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

}
