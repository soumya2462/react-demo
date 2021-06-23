import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from 'react-feather';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ContentLayout } from '../../components/Layout';
import { ActionButtonGroupType } from '../../components/List/ActionButtonGroup';
import List from '../../components/List/List';
import ListButtonGroup from '../../components/List/ListButtonGroup';
import ListRow, { RowProps } from '../../components/List/ListRow';
import { RootState } from '../../store';
import { apiSite } from '../../constants/apiTypes'

const SiteList = () => {
  const history = useHistory();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [sites, setSites] = useState<Array<RowProps>>([]);

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_DESIGN_GATEWAY_URL}/sites`,
      { headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      }})
    .then(response => {
      if (response.status === 200)
      {       
        setSites(response.data.map((site: apiSite) => siteToRowData(site)));
      }
    })
    .catch(error => {
      console.log(error);
    });
  }, [accessToken]);

  const siteToRowData = (site: apiSite): RowProps => {
    const date = new Date(site.createdDate.seconds*1000);    
    const modifiedOn = `Modified On ${date.toLocaleDateString()}`;

    return ({
      'id': site.siteId,
      'name': site.name,
      'columns': [modifiedOn],
    });
  };

  const getActionButtons = (siteId: string): ActionButtonGroupType => {
    return([
      {
        actionName: 'Clone',
        actionUrl: `/sites/${siteId}/clone`,
      },
    ]);
  };

  const deleteClick = (siteId: string) => {
    axios.delete(
      `${process.env.REACT_APP_DESIGN_GATEWAY_URL}/sites/${siteId}`,
      { headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      }})
    .then(response => {
      if (response.status === 204)
      {       
        setSites(sites.filter(siteRowProps => siteRowProps.id !== siteId));
      }
    },
    (error) => {
      console.log(error);
    });
  };
  
  const editClick = (siteId: string) => {
    history.push(`/sites/${siteId}`);
  };

  return (
    <ContentLayout title="Manage Sites" data-test="component-site-list">
      <List name="Site" data-test="site-list-list">
        <div>
          { sites.map(row =>
            <ListRow
              icon={<Layout />}
              data={row}
              key={row.id}
              onEditClick={() => editClick(row.id)}
            >
              <ListButtonGroup
                onEditClick={() => editClick(row.id)}
                onDeleteClick={() => deleteClick(row.id)}
                actionButtons={getActionButtons(row.id)} />
            </ListRow>
          )}
        </div>
      </List>
    </ContentLayout>
  );
};

export default SiteList;