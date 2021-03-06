import React from 'react';
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App';
import { fetchShow as mockFetchShows } from './api/fetchShow'

jest.mock('./api/fetchShow')


const episodesData = {
  data: {
    id: 2993,
    url: "http://www.tvmaze.com/shows/2993/stranger-things",
    name: "Stranger Things",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Fantasy", "Science-Fiction"],
    status: "Running",
    runtime: 60,
    premiered: "2016-07-15",
    officialSite: "https://www.netflix.com/title/80057281",
    schedule: {
      time: "",
      days: ["Thursday"]
    },
    rating: {
      average: 8.7
    },
    weight: 98,
    network: null,
    webChannel: {
      id: 1,
      name: "Netflix",
      country: null
    },
    externals: {
      tvrage: 48493,
      thetvdb: 305288,
      imdb: "tt4574334"
    },
    image: {
      medium:
        "http://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
      original:
        "http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"
    },
    summary:
      "<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>",
    updated: 1582785474,
    _links: {
      self: {
        href: "http://api.tvmaze.com/shows/2993"
      },
      previousepisode: {
        href: "http://api.tvmaze.com/episodes/1576476"
      }
    },
    _embedded: {
      episodes: [
        {
          id: 553946,
          url:
            "http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
          name: "Chapter One: The Vanishing of Will Byers",
          season: 1,
          number: 1,
          airdate: "2016-07-15",
          airtime: "",
          airstamp: "2016-07-15T12:00:00+00:00",
          runtime: 60,
          image: {
            medium:
              "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
            original:
              "http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg"
          },
          summary:
            "<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.</p>",
          _links: {
            self: {
              href: "http://api.tvmaze.com/episodes/553946"
            }
          }
        },
        {
          id: 578663,
          url:
            "http://www.tvmaze.com/episodes/578663/stranger-things-1x02-chapter-two-the-weirdo-on-maple-street",
          name: "Chapter Two: The Weirdo on Maple Street",
          season: 1,
          number: 2,
          airdate: "2016-07-15",
          airtime: "",
          airstamp: "2016-07-15T12:00:00+00:00",
          runtime: 60,
          image: {
            medium:
              "http://static.tvmaze.com/uploads/images/medium_landscape/72/181376.jpg",
            original:
              "http://static.tvmaze.com/uploads/images/original_untouched/72/181376.jpg"
          },
          summary:
            "<p>While the search for the missing Will continues, Joyce tells Jim about a call she apparently received from her son. Meanwhile, Jane warns Mike that there are bad people after her, and he realizes that she knows what happened to Will.</p>",
          _links: {
            self: {
              href: "http://api.tvmaze.com/episodes/578663"
            }
          }
        }
      ]
    }
  }
};

test('dropdown click', async () => {
  mockFetchShows.mockResolvedValueOnce(episodesData);
  const {  getByText } = render(<App />)
  getByText(/Fetching Data/i)
  await waitFor(() => {
    getByText(/select a season/i);
  });
 
  userEvent.click(getByText(/select a season/i))
  getByText(/season 1/i);
  expect(getByText(/season 1/i)).toHaveTextContent(
    /season 1/i
  );
  userEvent.click(getByText(/season 1/i))
  getByText(/Chapter Two:/i);
  expect(getByText(/Chapter Two:/i)).toHaveTextContent(
    /Two: The Weirdo on Maple Street/i
  );
  userEvent.click(getByText(/Chapter One:/i))
  getByText(/Chapter One:/i);
  expect(getByText(/Chapter One:/i)).toHaveTextContent(
    /Chapter One: The Vanishing of Will Byers/i
  );
})
// expect(queryAllByTestId(/episodes/i)).toHaveLength(3));
//   expect(mockFetchShows).toHaveBeenCalledTimes(1)w
