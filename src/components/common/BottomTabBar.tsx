import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  EmitterSubscription,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewForceInsetValue,
  BottomTabBarProps,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation';
import { palette } from 'constants/style';

const SAFE_AREA_INSET: {
  top: SafeAreaViewForceInsetValue;
  bottom: SafeAreaViewForceInsetValue;
} = {
  top: 'never',
  bottom: 'always',
};

interface Props extends BottomTabBarProps {
  isLoggedIn: boolean;
  onTabPress: ({ route }: { route: NavigationRoute<NavigationParams> }) => void;
  showAuthModal: () => void;
}

class BottomTabBar extends React.PureComponent<Props> {
  public state = {
    isVisible: true,
  };

  private onPressHandlers: {
    [key: string]: () => void;
  } = {};

  private keyboardDidShowListener?: EmitterSubscription;

  private keyboardDidHideListener?: EmitterSubscription;

  public componentDidMount() {
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this.onKeyboardDidShow,
      );

      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this.onKeyboardDidHide,
      );
    }
  }

  public componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }
    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  }

  public render() {
    if (!this.state.isVisible) {
      return null;
    }

    const {
      navigation: {
        state: {
          index: navigationIndex,
          routes,
        },
      },
      style,
    } = this.props;

    return (
      <SafeAreaView
        style={[
          styles.container,
          style,
          { backgroundColor: navigationIndex === 0 ? palette.transparent.black[60] : palette.gray[100] },
          { position: navigationIndex === 0 ? 'absolute' : 'relative' },
        ]}
        forceInset={SAFE_AREA_INSET}
      >
        {routes.map(this.renderTabItem)}
      </SafeAreaView>
    );
  }

  private renderTabItem = (route: NavigationRoute<NavigationParams>, index: number) => {
    const {
      navigation: {
        state: {
          index: navigationIndex,
        },
      },
      activeTintColor,
      inactiveTintColor,
      renderIcon,
    } = this.props;

    return (
      <TouchableOpacity
        key={route.key}
        style={styles.menu}
        activeOpacity={1}
        onPress={this.getOnPressHandler(route)}
      >
        {renderIcon({
          route,
          index: index,
          focused: navigationIndex === index,
          tintColor: navigationIndex === index ? activeTintColor : inactiveTintColor,
        })}
      </TouchableOpacity>
    );
  }

  private getOnPressHandler = (route: NavigationRoute<NavigationParams>) => {
    if (!Object.prototype.hasOwnProperty.call(this.onPressHandlers, route.key)) {
      this.onPressHandlers[route.key] = () => {
        const { params = {} } = route;
        const {
          isLoggedIn,
          showAuthModal,
          onTabPress,
        } = this.props;

        if (params.private && !isLoggedIn) {
          showAuthModal();
          return;
        }

        onTabPress({ route });
      };
    }

    return this.onPressHandlers[route.key];
  }

  private onKeyboardDidShow = () => this.setState({ isVisible: false });

  private onKeyboardDidHide = () => this.setState({ isVisible: true });
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    backgroundColor: palette.transparent.black[60],
  },
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabBar;
