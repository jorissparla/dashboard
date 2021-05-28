import { differenceInDays } from "date-fns";

interface IBacklog {
  incident?: string;
  awaitcount?: number;
  incidentcreated?: string;
  owner?: string;
  navid?: string;
  owner_region?: string;
  customername?: string;
  customerid?: number;
  summary?: string;
  title?: string;
  status?: string;
  dayssincelastupdate?: number;
  ownergroup?: string;
  daysSinceCreated?: number;
  contactname?: string;
  escalated?: number;
  Deployment?: string;
  severityname?: string;
  productline?: string;
  Tenant?: string;
  release?: string;
  region?: string;
  releasename?: string;
  service_restored_date?: string;
  scheduled_activity_date?: string;
  escalation_time?: string;
  action_date?: string;
}

interface IAccount {
  navid?: string;
  managerid?: string;
  fullname?: string;
}

const lower = (item: string) => item.toLowerCase();

class Backlog {
  data: IBacklog[];
  includeDevelopment: boolean;
  temp: any;
  includePending: boolean;
  accounts: IAccount[];
  constructor(data: IBacklog[], accounts: IAccount[], includeDevelopment = true, includePending = true) {
    this.data = data;
    this.temp = data;
    this.includeDevelopment = includeDevelopment;
    this.includePending = includePending;
    if (data) {
      this.temp = this.temp.filter((item: { status: string }) => item.status !== "Awaiting Development");
    }
    this.accounts = accounts;
  }

  addManager() {
    const response = this.temp.map((item: { navid: { toString: () => any } }) => {
      let managername = "";
      // console.log("🤦‍♂️", item.navid.toString());
      const owner: any = this.accounts.find((account: any) => account?.navid.toString() === item.navid.toString());
      if (owner && owner.managerid) {
        const manager = this.accounts.find((account: any) => account.navid.toString() === owner.managerid.toString());
        // console.log("🤦‍♂️", owner, manager);
        managername = manager?.fullname || "";
      }
      // const manager = this.accounts.find((account) => account.managerid?.toString() === item.navid.toString());
      // console.log("🤦‍♂️", item.navid, manager);
      return { ...item, managername };
    });
    this.temp = response.slice();
    return this;
  }

  incorrectOwnerGroup() {
    const ownergroups = ["LN Tools Support", "LN Finance Support", "LN Logistics Support", "LN Manufacturing Support"];
    const response = this.temp.filter(
      (item: { productline: string; ownergroup: string }) => item.productline === "LN" && !ownergroups.includes(item.ownergroup)
    );
    this.temp = response.slice();
    return this;
  }

  addEscalatedDays() {
    const response = this.temp.map((item: { escalation_time: string }) => {
      return { ...item, daysEscalated: !item.escalation_time ? 0 : differenceInDays(new Date(), parseInt(item.escalation_time)) };
    });
    this.temp = response.slice();
    return this;
  }

  includeDev() {
    this.includeDevelopment = true;
  }
  init() {
    this.temp = this.includeDevelopment ? this.data : this.data.filter((item) => item.status !== "Awaiting Development");
    this.temp = this.includePending ? this.temp : this.temp.filter((item: { status: string }) => item.status !== "Solution Pending Maintenance");
    return this;
  }

  hold() {
    this.data = this.temp;
    return this;
  }
  valid_actiondate() {
    this.temp = this.temp.filter((item: { action_date: number }) => item.action_date && item.action_date > new Date().getTime());
    return this;
  }
  invalid_actiondate() {
    this.temp = this.temp.filter((item: { action_date: number }) => !(item.action_date && item.action_date > new Date().getTime()));
    return this;
  }
  valid_onhold_date() {
    this.temp = this.temp.filter(
      (item: { scheduled_activity_date: number }) => item.scheduled_activity_date && item.scheduled_activity_date > new Date().getTime()
    );
    return this;
  }
  invalid_onhold_date() {
    this.temp = this.temp.filter(
      (item: { scheduled_activity_date: number }) => !(item.scheduled_activity_date && item.scheduled_activity_date > new Date().getTime())
    );
    return this;
  }
  invalid_activity_date() {
    this.temp = this.temp.filter((item: { scheduled_activity_date: any }) => !item.scheduled_activity_date);
    return this;
  }
  //owner
  owner(owner: string) {
    this.temp = this.temp.filter((item: { owner: string }) => item.owner.toLowerCase() === owner.toLowerCase());
    return this;
  }
  // owner_region
  ownerRegion(region: string) {
    this.temp = this.temp.filter((item: { owner_region: string }) => item.owner_region.toLowerCase() === region.toLowerCase());
    return this;
  }

  fieldNotNull(field: string) {
    this.temp = this.temp.filter((item: { [x: string]: any }) => item[field]);
    return this;
  }
  issupport() {
    this.temp = this.hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"]);
    return this;
  }
  // customername
  customername(customername: string) {
    this.temp = this.temp.filter((item: { customername: string }) => item.customername.toLowerCase().includes(customername.toLowerCase()));
    return this;
  }
  // customerid
  // status
  status(status: string) {
    this.temp = this.temp.filter((item: { status: string }) => item.status.toLowerCase() === status.toLowerCase());
    return this;
  }
  statusContains(status: string) {
    this.temp = this.temp.filter((item: { status: string }) => item.status.toLowerCase().includes(status.toLowerCase()));
    return this;
  }
  notStatus(statusAr = ["Solution Proposed"]) {
    this.temp = this.temp.filter((item: { status: string }) => !statusAr.map(lower).includes(item.status.toLowerCase()));
    return this;
  }
  getDefects() {
    this.temp = this.temp.filter((item: any) => item.status === "Awaiting Development");
    return this;
  }
  hasStatus(statusAr = ["Solution Proposed"]) {
    this.temp = this.temp.filter((item: { status: string }) => statusAr.map(lower).includes(item.status.toLowerCase()));
    return this;
  }
  // dayssincelastupdate
  dayssincelastupdate(dayssincelastupdate: number) {
    this.temp = this.temp.filter((item: { dayssincelastupdate: number }) => item.dayssincelastupdate > dayssincelastupdate);
    return this;
  }

  // ownergroup
  ownergroup(ownergroup: string) {
    this.temp = this.temp.filter((item: { ownergroup: string }) => item.ownergroup.toLowerCase() === ownergroup.toLowerCase());
    return this;
  }
  // daysSinceCreated
  daysSinceCreated(daysSinceCreated: number) {
    this.temp = this.temp.filter((item: { daysSinceCreated: number }) => item.daysSinceCreated > daysSinceCreated);
    return this;
  }
  // contactname
  incidentcreated(days: number) {
    this.temp = this.temp.filter((item: { incidentcreated: number }) => item.incidentcreated > days);
    return this;
  }
  // escalated
  escalated() {
    this.temp = this.temp.filter((item: { escalated: number }) => item.escalated === 1);
    return this;
  }
  // Deployment
  Deployment(Deployment: string) {
    this.temp = this.temp.filter((item: { Deployment: string }) => item.Deployment.toLowerCase() === Deployment.toLowerCase());
    return this;
  }
  // severityname
  severity(strSev: string) {
    this.temp = this.temp.filter((item: { severityname: string }) => item.severityname.toLowerCase() === strSev.toLowerCase());
    return this;
  }
  hasSeverity(severities = ["Major Impact"]) {
    this.temp = this.temp.filter((item: { severityname: string }) => severities.map(lower).includes(item.severityname.toLowerCase()));
    return this;
  }
  // severity
  // productline
  productline(productline: string) {
    this.temp = this.temp.filter((item: { productline: string }) => item.productline.toLowerCase() === productline.toLowerCase());
    return this;
  }
  productlines(productlines = ["LN"]) {
    this.temp = this.temp.filter((item: { productline: string }) => productlines.map(lower).includes(item.productline.toLowerCase()));
    return this;
  }
  // Tenant
  // release
  // region
  region(region: string) {
    this.temp = this.temp.filter((item: { region: string }) => item.region.toLowerCase() === region.toLowerCase());
    return this;
  }
  regions(regions: string[]) {
    this.temp = this.temp.filter((item: any) => regions.includes(item.region));
    return this;
  }
  // releasename
  releasename(releasename: string) {
    this.temp = this.temp.filter((item: { releasename: string }) => item.releasename.toLowerCase() === releasename.toLowerCase());
    return this;
  }
  // service_restored_date

  notServicedRestored() {
    this.temp = this.temp.filter((item: { service_restored_date: any }) => !item.service_restored_date);
    return this;
  }

  filterField(field: string, value: string) {
    this.temp = this.temp.filter((item: { [x: string]: string }) => item[field]?.toLowerCase() === value.toLowerCase());
    return this;
  }
  filterFieldNot(field: string | number, value: string) {
    this.temp = this.temp.filter((item: { [x: string]: string }) => item[field].toLowerCase() !== value.toLowerCase());
    return this;
  }
  isMT() {
    this.temp = this.temp.filter((item: { Tenant: string }) => item.Tenant && item.Tenant.toLowerCase() === "Multi-Tenant".toLowerCase());
    return this;
  }
  sort(field: string, dir = "A") {
    this.temp =
      dir.toLowerCase() === "A"
        ? this.temp.sort((x: { [x: string]: number }, y: { [x: string]: number }) => (x[field] > y[field] ? 1 : -1))
        : this.temp.sort((x: { [x: string]: number }, y: { [x: string]: number }) => (x[field] > y[field] ? -1 : 1));
    return this;
  }
  getData() {
    return this.temp;
  }
  getAvgAndData() {
    const sum = this.temp.reduce((total: any, item: { daysSinceCreated: any }) => total + item.daysSinceCreated, 0);
    const avg = (sum / (this.temp.length || 0 + 1)).toFixed(0);
    return [avg, this.temp];
  }
  getAvgOver30AndOver60AndData() {
    const sum = this.temp.reduce((total: any, item: { daysSinceCreated: any }) => total + item.daysSinceCreated, 0);
    const avg = (sum / (this.temp.length || 0 + 1)).toFixed(0);
    const over30 = this.temp.reduce((total: number, item: { daysSinceCreated: number }) => (total += item.daysSinceCreated >= 30 ? 1 : 0), 0);
    const over60 = this.temp.reduce((total: number, item: { daysSinceCreated: number }) => (total += item.daysSinceCreated >= 60 ? 1 : 0), 0);
    return [avg, this.temp, over30, over60];
  }
}

export { Backlog };
