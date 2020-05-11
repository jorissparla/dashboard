import { differenceInDays } from "date-fns";
const lower = (item) => item.toLowerCase();

class Backlog {
  constructor(data, accounts = []) {
    this.data = data;
    this.temp = data;
    this.accounts = accounts;
  }

  addManager() {
    const response = this.temp.map((item) => {
      let managername = "";
      // console.log("🤦‍♂️", item.navid.toString());
      const owner = this.accounts.find((account) => account.navid.toString() === item.navid.toString());
      if (owner && owner.managerid) {
        const manager = this.accounts.find((account) => account.navid.toString() === owner.managerid.toString());
        // console.log("🤦‍♂️", owner, manager);
        managername = manager?.fullname;
      }
      // const manager = this.accounts.find((account) => account.managerid?.toString() === item.navid.toString());
      // console.log("🤦‍♂️", item.navid, manager);
      return { ...item, managername };
    });
    this.temp = response.slice();
    return this;
  }

  addEscalatedDays() {
    console.log("hier");
    const response = this.temp.map((item) => {
      console.log(item.escalation_time);
      return { ...item, daysEscalated: !item.escalation_time ? 0 : differenceInDays(new Date(), parseInt(item.escalation_time)) };
    });
    this.temp = response.slice();
    return this;
  }

  init() {
    this.temp = this.data;
    return this;
  }

  hold() {
    this.data = this.temp;
    return this;
  }
  valid_actiondate() {
    this.temp = this.temp.filter((item) => item.action_date && item.action_date > new Date().getTime());
    return this;
  }
  invalid_activity_date() {
    this.temp = this.temp.filter((item) => !item.scheduled_activity_date);
    return this;
  }
  //owner
  owner(owner) {
    this.temp = this.temp.filter((item) => item.owner.toLowerCase() === owner.toLowerCase());
    return this;
  }
  // owner_region
  ownerRegion(region) {
    this.temp = this.temp.filter((item) => item.owner_region.toLowerCase() === region.toLowerCase());
    return this;
  }

  issupport() {
    this.temp = this.hasStatus(["Researching", "On Hold by Customer", "Awaiting Infor", "Awaiting Customer"]);
    return this;
  }
  // customername
  customername(customername) {
    this.temp = this.temp.filter((item) => item.customername.toLowerCase().includes(customername.toLowerCase()));
    return this;
  }
  // customerid
  // status
  status(status) {
    this.temp = this.temp.filter((item) => item.status.toLowerCase() === status.toLowerCase());
    return this;
  }
  statusContains(status) {
    this.temp = this.temp.filter((item) => item.status.toLowerCase().includes(status.toLowerCase()));
    return this;
  }
  notStatus(statusAr = ["Solution Proposed"]) {
    this.temp = this.temp.filter((item) => !statusAr.map(lower).includes(item.status.toLowerCase()));
    return this;
  }
  hasStatus(statusAr = ["Solution Proposed"]) {
    this.temp = this.temp.filter((item) => statusAr.map(lower).includes(item.status.toLowerCase()));
    return this;
  }
  // dayssincelastupdate
  dayssincelastupdate(dayssincelastupdate) {
    this.temp = this.temp.filter((item) => item.dayssincelastupdate > dayssincelastupdate);
    return this;
  }

  // ownergroup
  ownergroup(ownergroup) {
    this.temp = this.temp.filter((item) => item.ownergroup.toLowerCase() === ownergroup.toLowerCase());
    return this;
  }
  // daysSinceCreated
  daysSinceCreated(daysSinceCreated) {
    this.temp = this.temp.filter((item) => item.daysSinceCreated > daysSinceCreated);
    return this;
  }
  // contactname
  incidentcreated(days) {
    this.temp = this.temp.filter((item) => item.incidentcreated > days);
    return this;
  }
  // escalated
  escalated() {
    this.temp = this.temp.filter((item) => item.escalated === 1);
    return this;
  }
  // Deployment
  Deployment(Deployment) {
    this.temp = this.temp.filter((item) => item.Deployment.toLowerCase() === Deployment.toLowerCase());
    return this;
  }
  // severityname
  severity(strSev) {
    this.temp = this.temp.filter((item) => item.severityname.toLowerCase() === strSev.toLowerCase());
    return this;
  }
  hasSeverity(severities = ["Major Impact"]) {
    this.temp = this.temp.filter((item) => severities.map(lower).includes(item.severityname.toLowerCase()));
    return this;
  }
  // severity
  // productline
  productline(productline) {
    this.temp = this.temp.filter((item) => item.productline.toLowerCase() === productline.toLowerCase());
    return this;
  }
  productlines(productlines = ["LN"]) {
    this.temp = this.temp.filter((item) => productlines.map(lower).includes(item.productline.toLowerCase()));
    return this;
  }
  // Tenant
  // release
  // region
  region(region) {
    this.temp = this.temp.filter((item) => item.region.toLowerCase() === region.toLowerCase());
    return this;
  }
  // releasename
  releasename(releasename) {
    this.temp = this.temp.filter((item) => item.releasename.toLowerCase() === releasename.toLowerCase());
    return this;
  }
  // service_restored_date

  notServicedRestored() {
    this.temp = this.temp.filter((item) => !item.service_restored_date);
    return this;
  }

  filterField(field, value) {
    this.temp = this.temp.filter((item) => item[field].toLowerCase() === value.toLowerCase());
    return this;
  }
  filterFieldNot(field, value) {
    this.temp = this.temp.filter((item) => item[field].toLowerCase() !== value.toLowerCase());
    return this;
  }
  isMT() {
    this.temp = this.temp.filter((item) => item.Tenant && item.Tenant.toLowerCase() === "Multi-Tenant".toLowerCase());
    return this;
  }
  sort(field, dir = "A") {
    this.temp =
      dir.toLowerCase() === "A" ? this.temp.sort((x, y) => (x[field] > y[field] ? 1 : -1)) : this.temp.sort((x, y) => (x[field] > y[field] ? -1 : 1));
    return this;
  }
  getData() {
    return this.temp;
  }
}

export { Backlog };
