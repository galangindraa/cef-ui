
import { useCefEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { Box, Center, Group, RingProgress, Stack, Text, ThemeIcon } from '@mantine/core';
import { createStyles, keyframes } from '@mantine/emotion';
import React, { useState } from 'react';
import tinycolor from 'tinycolor2';
import MarkdownComponents from '../config/MarkdownComponents';
import LibIcon from '../config/LibIcon';
import { 
  Info, 
  XCircle, 
  CheckCircle, 
  AlertCircle,  
  LucideIcon 
} from 'lucide-react';

interface NotificationData {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconAnimation?: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
  position?: string;
  showDuration?: boolean;
  alignIcon?: 'center' | 'start';
  style?: React.CSSProperties;
  id?: string;
}

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 'fit-content',
    backgroundColor: theme.colors.dark[8],
    color: theme.colors.dark[0],
    padding: 12,
    borderRadius: theme.radius.sm,
    fontFamily: 'Roboto',
    boxShadow: theme.shadows.sm,
  },
  title: {
    fontWeight: 500,
    lineHeight: 'normal',
  },
  description: {
    fontSize: 12,
    color: theme.colors.dark[2],
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },
  descriptionOnly: {
    fontSize: 14,
    color: theme.colors.dark[2],
    fontFamily: 'Roboto',
    lineHeight: 'normal',
  },
}));

const createAnimation = (from: string, to: string, visible: boolean) => keyframes({
  from: {
    opacity: visible ? 0 : 1,
    transform: `translate${from}`,
  },
  to: {
    opacity: visible ? 1 : 0,
    transform: `translate${to}`,
  },
});

const getAnimation = (visible: boolean, position: string) => {
  const animationOptions = visible ? '0.2s ease-out forwards' : '0.4s ease-in forwards'
  let animation: { from: string; to: string };

  if (visible) {
    animation = position.includes('bottom') ? { from: 'Y(30px)', to: 'Y(0px)' } : { from: 'Y(-30px)', to:'Y(0px)' };
  } else {
    if (position.includes('right')) {
      animation = { from: 'X(0px)', to: 'X(100%)' }
    } else if (position.includes('left')) {
      animation = { from: 'X(0px)', to: 'X(-100%)' };
    } else if (position === 'top-center') {
      animation = { from: 'Y(0px)', to: 'Y(-100%)' };
    } else if (position === 'bottom') {
      animation = { from: 'Y(0px)', to: 'Y(100%)' };
    } else {
      animation = { from: 'X(0px)', to: 'X(100%)' };
    }
  }

  return `${createAnimation(animation.from, animation.to, visible)} ${animationOptions}`
};

const durationCircle = keyframes({
  '0%': { strokeDasharray: `0, ${15.1 * 2 * Math.PI}` },
  '100%': { strokeDasharray: `${15.1 * 2 * Math.PI}, 0` },
});

const Notifications: React.FC = () => {
  const { classes } = useStyles();
  const [toastKey, setToastKey] = useState(0);

  useCefEvent<any>('ui:notify', (dataJ) => {
    console.log(dataJ);
    const data: NotificationData = JSON.parse(dataJ);

    if (!data.title && !data.description) return;

    // Generate unique ID if not provided to prevent spam
    const toastId = (data.id && data.id !== "default") ? data.id : `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const duration = data.duration || 3000;

    let iconColor: string;
    let position = data.position || 'top-right';

    data.showDuration = data.showDuration !== undefined ? data.showDuration : true;

    if (toastId) setToastKey(prevKey => prevKey + 1);

    switch (position) {
      case 'top':
        position = 'top-center';
        break;
      case 'bottom':
        position = 'bottom-center';
        break;
    }

    // Handle icon assignment - if icon is a string, convert to component
    if (!data.icon) {
      switch (data.type) {
        case 'error':
          data.icon = XCircle;
          break;
        case 'success':
          data.icon = CheckCircle;
          break;
        case 'warning':
          data.icon = AlertCircle;
          break;
        default:
          data.icon = Info;
          break;
      }
    } else if (typeof data.icon === 'string') {
      // If icon comes as string from JSON, convert to component
      switch (data.icon) {
        case 'CircleXMark':
          data.icon = XCircle;
          break;
        case 'CircleCheck':
          data.icon = CheckCircle;
          break;
        case 'CircleAlert':
          data.icon = AlertCircle;
          break;
        case 'Info':
          data.icon = Info;
          break;
        default:
          data.icon = Info;
          break;
      }
    }

    if (!data.iconColor) {
      switch (data.type) {
        case 'error':
          iconColor = 'red.6';
          break;
        case 'success':
          iconColor = 'teal.6';
          break;
        case 'warning':
          iconColor = 'yellow.6';
          break;
        default:
          iconColor = 'blue.6';
          break;
      }
    } else {
      iconColor = tinycolor(data.iconColor).toRgbString();
    }
    
    toast.custom(
      (t) => (
        <Box
          style={{
            animation: getAnimation(t.visible, position),
            ...data.style,
          }}
          className={`${classes.container}`}
        >
          <Group wrap="nowrap" gap={12}>
            {data.icon && (
              <>
                {data.showDuration ? (
                  <RingProgress
                    key={toastKey}
                    size={38}
                    thickness={2}
                    sections={[{ value: 100, color: iconColor }]}
                    style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                    styles={{
                      root: {
                        '> svg > circle:nth-of-type(2)': {
                          animation: `${durationCircle} linear forwards reverse`,
                          animationDuration: `${duration}ms`,
                        },
                        margin: -3,
                      },
                    }}
                    label={
                      <Center>
                        <ThemeIcon
                          color={iconColor}
                          radius="xl"
                          size={32}
                          variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
                        >
                          <LibIcon icon={data.icon} className={data.iconAnimation} />
                        </ThemeIcon>
                      </Center>
                    }
                  />
                ) : (
                  <ThemeIcon
                    color={iconColor}
                    radius="xl"
                    size={32}
                    variant={tinycolor(iconColor).getAlpha() < 0 ? undefined : 'light'}
                    style={{ alignSelf: !data.alignIcon || data.alignIcon === 'center' ? 'center' : 'start' }}
                  >
                    <LibIcon icon={data.icon} className={data.iconAnimation} />
                  </ThemeIcon>
                )}
              </>
            )}
            <Stack gap={0}>
              {data.title && <Text className={classes.title}>{data.title}</Text>}
              {data.description && (
                <ReactMarkdown
                  components={MarkdownComponents}
                  className={`${!data.title ? classes.descriptionOnly : classes.description} description`}
                >
                  {data.description}
                </ReactMarkdown>
              )}
            </Stack>
          </Group>
        </Box>
      ),
      {
        id: toastId,
        duration: duration,
        position: position as any,
      }
    );
  });

  return <Toaster />;
};

export default Notifications;
