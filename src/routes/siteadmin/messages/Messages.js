import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Messages.css';

// Query
import messagesQuery from './messagesQuery.graphql';

import Loader from '../../../components/Loader';

import MessageManagement from '../../../components/siteadmin/MessageManagement';

class Messages extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllMessageHistory: PropTypes.array,
    })
  };

  render() {
    const { data: { loading } } = this.props;
    
    if (loading) {
      return <Loader type={"text"} />;
    }

    const { data: { getAllMessageHistory, refetch }, title } = this.props;
    return <MessageManagement
      data={getAllMessageHistory}
      title={title}
      refetch={refetch} />
  }

}

export default compose(
  withStyles(s),
  graphql(messagesQuery,
    {
      options: {
        fetchPolicy: 'network-only',
        ssr: false
      }
    }),
)(Messages);
