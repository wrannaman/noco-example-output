import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withStyles } from "@material-ui/core/styles";
import Router, { withRouter } from "next/router";
import MaterialTable from "material-table";
import moment from "moment";
import {
  RefreshOutlined,
  Add,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  Save,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";

import {
  createCompany,
  fetchCompany,
  fetchCompanys,
  updateCompany,
  deleteCompany
} from "../src/apiCalls/company";

const tableIcons = {
  Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const styles = theme => ({
  root: {}
});
@inject("store")
@observer
class WrappedTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {};

  onRowAdd = newData =>
    new Promise(async (resolve, reject) => {
      const {
        snack: { snacky }
      } = this.props.store;
      await createCompany(newData);
      resolve();
    });

  onRowUpdate = (newData, oldData) =>
    new Promise(async (resolve, reject) => {
      const {
        snack: { snacky }
      } = this.props.store;
      const changed = {};
      Object.keys(oldData).forEach(key => {
        if (oldData[key] !== newData[key]) changed[key] = newData[key];
      });
      changed.id = oldData.id;
      const d = await updateCompany(changed);
      resolve();
    });

  onRowDelete = oldData =>
    new Promise(async (resolve, reject) => {
      const d = await deleteCompany(oldData.id);
      resolve();
    });

  getData = async q => {
    const {
      snack: { snacky }
    } = this.props.store;
    if (q.orderBy) q.orderBy = JSON.stringify(q.orderBy);
    if (q.filters.length > 0) q.filters = JSON.stringify(q.filters);
    const _data = await fetchCompanys({ ...q });
    if (_data.error) {
      snacky("Error getting data");
      return { data: [], page: 0, totalCount: 0 };
    }
    return {
      data: _data.companys,
      page: _data.offset / _data.limit,
      totalCount: _data.count
    };
  };

  render() {
    const {
      auth: { user }
    } = this.props.store;
    const editable = {
      onRowAdd: this.onRowAdd,
      onRowUpdate: this.onRowUpdate,
      onRowDelete: this.onRowDelete
    };
    return (
      <MaterialTable
        icons={tableIcons}
        columns={[
          { title: "id", field: "id", type: "numeric" },
          { title: "name", field: "name", type: "string" },
          { title: "email", field: "email", type: "string" },
          { title: "frontEnd", field: "frontEnd", type: "boolean" },
          { title: "backEnd", field: "backEnd", type: "boolean" },
          { title: "personName", field: "personName", type: "string" },
          { title: "howManyHire", field: "howManyHire", type: "numeric" },
          { title: "fullStack", field: "fullStack", type: "boolean" }
        ]}
        title={"allCompanies"}
        data={this.getData}
        tableRef={this.tableRef}
        options={{
          filtering: true,
          exportButton: true,
          search: false,
          draggable: true
        }}
        editable={editable}
        actions={[
          {
            icon: RefreshOutlined,
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () =>
              this.tableRef.current && this.tableRef.current.onQueryChange()
          }
        ]}
      />
    );
  }
}

WrappedTable.defaultProps = {
  onClick: () => {}
};

WrappedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(WrappedTable));
