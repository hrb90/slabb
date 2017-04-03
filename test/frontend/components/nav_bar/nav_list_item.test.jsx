import React from 'react';
import NavListItem from '../../../../frontend/components/nav_bar/nav_list_item';
import renderer from 'react-test-renderer';

const mockNameFix = jest.fn();
mockNameFix.mockReturnValue("Fixed!");

const mockFetchChannel = id => jest.fn().mockReturnValue("Fetched!");

const basicChannel = {
      id: 2,
      name: "channel",
      newMessages: false,
      channel_type: "channel"
    };

const newMessagesChannel = {
      id: 2,
      name: "channel",
      newMessages: true,
      channel_type: "channel"
    };

const dmChannel ={
      id: 2,
      name: "channel",
      newMessages: false,
      channel_type: "dm"
    };

describe('NavListItem', () => {
  it('renders basic props correctly', () => {
    const tree = renderer.create(
      <NavListItem channel={ basicChannel } currentChannelId={ 1 }
        fixDMName={ mockNameFix } fetchChannel={ mockFetchChannel } />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders new messages correctly', () => {
    const tree = renderer.create(
      <NavListItem channel={ newMessagesChannel } currentChannelId={ 1 }
        fixDMName={ mockNameFix } fetchChannel={ mockFetchChannel } />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the current channel correctly', () => {
    const tree = renderer.create(
      <NavListItem channel={ basicChannel } currentChannelId={ 2 }
        fixDMName={ mockNameFix } fetchChannel={ mockFetchChannel } />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls fixDMName when passed a DM channel', () => {
    renderer.create(
      <NavListItem channel={ dmChannel } currentChannelId={ 1 }
        fixDMName={ mockNameFix } fetchChannel={ mockFetchChannel } />
    );
    expect(mockNameFix).toBeCalled();
  });
});
