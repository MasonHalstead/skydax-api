import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableBase } from './TableBase';
import { TableHeader } from './TableHeader';
import {
  compareJSON,
  handleSearchFilter,
  handleKeywordFilter,
  handleSortingFilter,
} from '../../utils/helpers';

export class Table extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    headers: PropTypes.array,
    keywords: PropTypes.array,
    search_input: PropTypes.string,
    header_component: PropTypes.any,
    cell_components: PropTypes.array,
    table_component: PropTypes.any,
    settings: PropTypes.object,
    rows: PropTypes.array,
  };

  static defaultProps = {
    headers: [],
    rows: [],
    header_component: TableHeader,
    table_component: TableBase,
    keywords: [],
    callbacks: {},
    settings: {},
    search_input: '',
  };

  state = {
    headers: [],
    headers_data: [],
    rows: [],
    sort_key: false,
    sort: 'desc',
  };

  componentDidMount() {
    const { rows } = this.props;
    this.setState({ rows });
  }

  static getDerivedStateFromProps(props, state) {
    const { keywords, search_input, rows, headers } = props;
    const { sort_key, sort, headers_data } = state;
    const { settings } = props;

    if (!compareJSON(headers_data, headers)) {
      return {
        headers_data: props.headers,
        headers: props.headers,
      };
    }
    const search_filter_rows = handleSearchFilter({
      rows,
      settings,
      search_input,
    });

    const keyword_filter_rows = handleKeywordFilter({
      rows: search_filter_rows,
      settings,
      keywords,
    });

    const sort_filter_rows = handleSortingFilter({
      rows: keyword_filter_rows,
      sort_key,
      sort,
    });

    return { rows: [...sort_filter_rows] };
  }

  handleSort = (header, headers) => {
    const { sort_key, sort } = header;
    this.setState({ headers, sort_key, sort });
  };

  render() {
    const { headers, rows } = this.state;

    const {
      settings,
      callbacks,
      header_component,
      cell_components,
      table_component: TableComponent,
    } = this.props;

    return (
      <TableComponent
        headers={headers}
        rows={rows}
        callbacks={callbacks}
        header_component={header_component}
        cell_components={cell_components}
        settings={settings}
        handleSort={this.handleSort}
      />
    );
  }
}
