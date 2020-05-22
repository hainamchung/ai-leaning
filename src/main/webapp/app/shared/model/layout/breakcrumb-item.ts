interface IBreadCrumbItem {
  breadcrumb: string;
  path: string;
  match: {
    url: string;
  };
}

export { IBreadCrumbItem };
