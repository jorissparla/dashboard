export function Defect(defects) {
  let data = defects;
  let tmp = defects;
  let targetAdded = false;
  return {
    init() {
      tmp = data;
      return this;
    },
    addTargetMet(severityList, col) {
      this.targetAdded = true;
      let result = tmp.map((item) => {
        severityList.map((s) => {});
        const row = severityList.find((s) => s.id === item.severity_id);
        if (!row) {
        }
        const targetVal = parseInt(row[col]);

        return { ...item, targetMet: item.ageDays <= targetVal, target: targetVal };
      });
      tmp = result;
      return this;
    },

    getData() {
      return tmp;
    },
    filterGroups(listOfGroups) {
      tmp = tmp.filter((def) => listOfGroups.includes(def.groupOwner));
      return this;
    },
    filterStatus(status) {
      tmp = tmp.filter((def) => def.Status === status);
      return this;
    },
    filterDev(dev) {
      tmp = tmp.filter((def) => def.Developer === dev);
      return this;
    },
    filterUnassigned(dev) {
      tmp = tmp
        .filter((def) => def.Developer === dev)
        .filter((def) => def.Status !== "Approved")
        .filter((def) => def.Status !== "Assigned");
      return this;
    },
    filterSeverity(sev) {
      tmp = tmp.filter((def) => def.severity_name === sev);
      return this;
    },
    filterOwnerGroup(groupOwner) {
      if (groupOwner) {
        tmp = tmp.filter((def) => def.groupOwner === groupOwner);
      }
      return this;
    },
    filterSeverities(arSev = []) {
      tmp = tmp.filter((def) => arSev.includes(def.severity_id));
      return this;
    },
    filterCloudOnly(isCloud) {
      if (isCloud) {
        tmp = tmp.filter((def) => def.hascloud > 0);
      }
      return this;
    },
    sort(field, dir = "A") {
      if (tmp?.length > 0) {
        tmp = dir.toLowerCase() === "A" ? tmp.sort((x, y) => (x[field] > y[field] ? 1 : -1)) : tmp.sort((x, y) => (x[field] > y[field] ? -1 : 1));
      }
      return this;
    },
    getAvgAndData() {
      const sum = tmp.reduce((total, item) => total + item.ageDays, 0);
      const met = this.targetAdded && tmp.length > 0 ? ((tmp.filter((item) => item.targetMet).length * 100) / tmp.length).toFixed(0) : 0;
      const avg = (sum / (tmp.length || 0 + 1)).toFixed(0);
      return [avg, tmp, met];
    },
  };
}
