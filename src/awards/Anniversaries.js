import { withStyles } from '@material-ui/core/styles';
import { request } from 'graphql-request';
import React from 'react';
import useSWR from 'swr';
import { uri } from '../index';
import { format } from '../utils/format';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '15px',
    minWidth: '200px'
  },
  card: {
    width: 320,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  button: {
    margin: theme.spacing(1),
    width: 200
  }
});

// const STR_ALL_ANNIVERSARIES = `
//   query ALL_ANNIVERSARIES {
//     anniversaries {
//       anniversarydate
//       dateofhire
//       fullname
//       years
//       id
//       account {
//         id
//         lastname
//         image
//       }
//     }
//   }
// `;

// const ALL_ANNIVERSARIES = gql`
//   query ALL_ANNIVERSARIES {
//     anniversaries {
//       anniversarydate
//       dateofhire
//       fullname
//       years
//       id
//       account {
//         id
//         lastname
//         image
//       }
//     }
//   }
// `;

function AnniversaryList({ classes }) {
  const { data, error } = useSWR(
    ` query {
      anniversaries {
      anniversarydate
      dateofhire
      fullname
      years
      id
      account {
        id
        lastname
        image
      }
    }
    }`,

    query => request(uri, query)
  );

  if (error) return <div>failed to load {JSON.stringify(error)}</div>;
  if (!data) return <div>loading...</div>;

  const { anniversaries } = data;
  // return (
  //   <div>
  //     Hallo {uri}
  //     <code>{JSON.stringify(anniversaries)}</code>
  //   </div>
  // );

  return (
    <div className="h-screen w-full bg-cool-gray-200">
      <div className="font-sansI text-3xl">Anniversaries</div>

      <div style={{ display: 'flex', margin: 4, flexWrap: 'wrap' }}>
        {anniversaries.map(({ id, fullname, years, account, anniversarydate }) => (
          <div
            key={id}
            className="inline-flex max-w-xs flex-col m-2 justify-end border rounded-lg  overflow-hidden bg-white relative"
          >
            <div
              className="left-2 absolute bottom-12 opacity-75 text-teal-200 text-4xl inline-block "
              style={{ textShadow: '1px 1px #000' }}
            >
              {fullname}
            </div>
            <img
              className="h-full w-full object-cover"
              src={
                account.image ||
                'https://images.unsplash.com/photo-1521729839347-131a32f9abcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                // `https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`
              }
              alt="incident owner"
            />
            <h1
              className="left-2 not-sr-only absolute top-8 font-pop text-teal-200 text-4xl font-bold"
              style={{ textShadow: '1px 1px #000' }}
            >
              {years} years
            </h1>
            <h2 className="absolute bottom-4 text-white" style={{ textShadow: '1px 1px #000' }}>
              {' '}
              {format(anniversarydate, 'EEE, dd MMMM yyyy')}
            </h2>
          </div>
          // <Card className={classes.card} key={id}>
          //   <CardActionArea>
          //     <Image image={account.image} fullname={fullname} />
          //     <CardContent>
          //       <Typography gutterBottom variant="h5" component="h2">
          //         {fullname}
          //       </Typography>
          //       <Typography gutterBottom variant="h2" component="h2">
          //         {years}
          //       </Typography>
          //     </CardContent>
          //   </CardActionArea>
          //   <Button color="secondary" aria-label="Add">
          //     {format(anniversarydate, 'EEE, dd MMMM yyyy')}
          //   </Button>
          // </Card>
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(AnniversaryList);
