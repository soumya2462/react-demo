import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package } from 'react-feather';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ContentLayout } from '../../components/Layout';
import { ActionButtonGroupType } from '../../components/List/ActionButtonGroup';
import List from '../../components/List/List';
import ListButtonGroup from '../../components/List/ListButtonGroup';
import ListRow, { RowProps } from '../../components/List/ListRow';
import { RootState } from '../../store';
import { apiPackage } from '../../constants/apiTypes'

const PackageList = () => {
  const history = useHistory();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [packages, setPackages] = useState<Array<RowProps>>([]);

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_DESIGN_GATEWAY_URL}/packages`,
      { headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      }})
    .then(response => {
      if (response.status === 200)
      {       
        setPackages(response.data.map((pack: apiPackage) => packageToRowData(pack)));
      }
    })
    .catch(error => {
      console.log(error);
    });
  }, [accessToken]);

  const packageToRowData = (pack: apiPackage): RowProps => {
    const date = new Date(pack.createdDate.seconds*1000);
    const modifiedOn = `Modified On ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

    return ({
    'id': pack.id,
    'name': pack.name,
    'columns': [modifiedOn],
  })};

  const getActionButtons = (id: string): ActionButtonGroupType => {
    return([
      {
        actionName: 'Clone',
        actionUrl: `/packages/${id}/clone`,
      },
    ]);
  };

  const deleteClick = (id: string) => {
    axios.delete(
      `${process.env.REACT_APP_DESIGN_GATEWAY_URL}/packages/${id}`,
      { headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      }})
    .then(response => {
      if (response.status === 204)
      {       
        setPackages(packages.filter(x => x.id !== id));
      }
    },
    (error) => {
      console.log(error);
    });
  };
  
  const editClick = (id: string) => {
    history.push(`/packages/${id}`);
  };

  return (
    <ContentLayout title="Manage Packages" data-test="component-package-list">
      <List name="Package" data-test="package-list-list">
        <div>
          { packages.map(row =>
            <ListRow
              icon={<Package />}
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

export default PackageList;