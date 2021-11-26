import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package } from 'react-feather';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ContentLayout } from '../../components/Layout';
import List from '../../components/List/List';
import ListRow, { RowProps } from '../../components/List/ListRow';
import { RootState } from '../../store';
import { apiPackage } from '../../constants/apiTypes';

const PackageList = () => {
  const history = useHistory();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [packages, setPackages] = useState<Array<RowProps>>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/packages`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPackages(response.data.map((pack: apiPackage) => packageToRowData(pack)));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken]);

  const packageToRowData = (pack: apiPackage): RowProps => {
    const date = new Date(pack.createdDate.seconds * 1000);
    const modifiedOn = `Modified On ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return {
      id: pack.packageId,
      name: pack.name,
      columns: [modifiedOn],
    };
  };

  const deleteClick = (packageId: string) => {
    axios
      .delete(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/packages/${packageId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      })
      .then(
        (response) => {
          if (response.status === 204) {
            setPackages(packages.filter((x) => x.id !== packageId));
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const editClick = (packageId: string) => {
    history.push(`/packages/${packageId}`);
  };

  return (
    <ContentLayout title="Manage Packages" data-test="component-package-list">
      <List createLabel="Create Package" data-test="package-list-list">
        <div>
          {packages.map((row) => (
            <ListRow
              icon={<Package />}
              data={row}
              key={row.id}
              onEditClick={() => editClick(row.id)}
              onDeleteClick={() => deleteClick(row.id)}
            />
          ))}
        </div>
      </List>
    </ContentLayout>
  );
};

export default PackageList;
