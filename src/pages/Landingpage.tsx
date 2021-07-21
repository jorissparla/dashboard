import {
  ChartBarIcon,
  CloudUploadIcon,
  CogIcon,
  ExclamationIcon,
  LibraryIcon,
  LockClosedIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  TableIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import { UserContext, useUserContext } from "globalState/UserProvider";

import { hasPermission } from "utils/hasPermission";

const features = [
  {
    name: "Support Cards",
    description: "Quickly find anything procedural, work instructions, links etc",
    icon: ServerIcon,
    link: "/supportcard",
    color: "bg-red-600",
  },
  {
    name: "Multitenant customers",
    description: "Get a list with all of the tenants for our MT customers.",
    icon: CloudUploadIcon,
    link: "/tenant",
  },
  {
    name: "Maintenance Wizard",
    description: "See the different phases of our Life Cycle Policy for all versions and what support we can deliver ",
    icon: LockClosedIcon,
    color: "bg-amber-200 text-amber-700",
    link: "/maintenance",
  },
  {
    name: "Backlog List",
    description: "Quickly pull incident information from all regions and export to Excel",
    icon: LibraryIcon,
    color: "bg-blue-400",
    link: "/products/all",
    isadmin: true,
  },
  {
    name: "Admin Worklist",
    description: "Follow backlog closely and see different categories important for realizing KPIs.",
    icon: LibraryIcon,
    color: "bg-teal-600",
    link: "/mywork",
    isadmin: true,
  },
  {
    name: "Essential Worklist",
    description: "Your personalized worklist, everything you need to determine what incidents to work on!",
    icon: LibraryIcon,
    color: "bg-pink-500",
    link: "/essentialworklist",
    isadmin: false,
  },

  {
    name: "Backlog Chart ",
    description: "See backlog and aging evolve over time (LN)",
    icon: ChartBarIcon,
    color: "bg-teal-400",
    link: "/historyLN/All",
    html: (
      <div>
        <div className="font-bold">See backlog and aging evolve over time (LN)</div>
        <div className="flex gap-x-2 justify-between flex-wrap">
          <a className=" bg-amber-200 text-amber-700 px-2 py-1 rounded font-semibold " href="/historyLN/APJ">
            APJ
          </a>
          <a className=" bg-amber-200 text-amber-700 px-2 py-1 rounded font-semibold " href="/historyLN/EMEA">
            EMEA
          </a>
          <a className=" bg-amber-200 text-amber-700 px-2 py-1 rounded font-semibold " href="/historyLN/LA">
            LA
          </a>
          <a className=" bg-amber-200 text-amber-700 px-2 py-1 rounded font-semibold " href="/historyLN/NA">
            NA
          </a>
          <a className=" bg-amber-200 text-amber-700 px-2 py-1 rounded font-semibold " href="/historyLN/All">
            All
          </a>
        </div>
      </div>
    ),
  },
  {
    name: "Advanced Features",
    description: "Login to see advanced features (LN/AE support only)",
    icon: ShieldCheckIcon,
    link: "/login",
    authenticated: true,
  },
  {
    name: "Sumo Logic",
    description: "Proactive support with SumoLogic",
    icon: TableIcon,
    link: "/sumo",
    color: "bg-red-400",
    authenticated: true,
  },
  {
    name: "Go Lives",
    description: "See when customers go live",
    icon: TableIcon,
    link: "/golives",
    color: "bg-amber-200",
    authenticated: true,
  },
  {
    name: "Priority Dashboard",
    description: "See how many priorities are pending",
    icon: ExclamationIcon,
    link: "/priority",
    color: "bg-purp",
    authenticated: true,
  },
  {
    name: "Customer Satisfaction Surveys",
    description: "See what customers think of our service, and what comments they provide",
    icon: QuestionMarkCircleIcon,
    link: "/surveys",
    authenticated: true,
  },
  {
    name: "Anniversaries",
    description: "See service anniversaries of support staff",
    icon: QuestionMarkCircleIcon,
    color: "bg-teal-400",
    link: "/anniversaries",
    authenticated: true,
  },
];

export default function Example() {
  const { user } = useUserContext();
  let isAdmin = false;
  let isSuperUser = false;
  let authenticated = false;
  if (user) {
    authenticated = true;
    isAdmin = user.role === "Admin";
    isSuperUser = user.role === "PO";
    isSuperUser = isSuperUser || hasPermission(user.permissions, ["PO", "ADMIN", "FILEUPLOAD"]);
  }
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <main>
          {/* Feature section with grid */}
          <div className="relative bg-white py-16 sm:py-10 lg:py-16">
            <div className="mx-20  px-4 text-center sm:max-w-7xl sm:px-6 lg:px-8 lg:max-w-8xl">
              <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Support Dashboard</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Everything you need to get going in support</p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">Start here. There is more on the menu!</p>
              <div className="mt-12">
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-5 gap-y-3">
                  {features.map((feature) => (
                    <div key={feature.name} hidden={feature.isadmin && !isAdmin} className="pt-6">
                      <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div className="mt-6">
                          <div>
                            <span
                              className={`inline-flex items-center justify-center p-3  ${
                                feature.color ? feature.color : "bg-blue-500"
                              }  rounded-md shadow-lg`}
                            >
                              <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-blue-800 tracking-tight">
                            <a href={feature.link}>{feature.name}</a>
                          </h3>
                          <div className="mt-5 text-base text-gray-500">{feature.html || feature.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
