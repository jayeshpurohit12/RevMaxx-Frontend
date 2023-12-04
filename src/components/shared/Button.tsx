import { TouchableHighlight, Text } from 'react-native'
import { COLORS, FONT } from '../../themes/themes'

type ButtonTypes = {
    name: string;
    type?: string;
    onPress?: () => void;
    size?: 'large' | 'small';
}

export default function Button(props: ButtonTypes) {
    return (
        <TouchableHighlight
            style={{
                width: props.size === 'small' ? '48%' : '100%',
                height: 60,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: COLORS.primary,
                backgroundColor: props.type === 'secondary' ? COLORS.white : COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={props.onPress}
            underlayColor={props.type === 'secondary' ? '#00000010' : '#4B8AF190'}
        >
            <Text
                style={{
                    fontFamily: FONT.medium,
                    fontSize: 16,
                    color: props.type === 'secondary' ? COLORS.primary : COLORS.white
                }}
            >
                {props.name}
            </Text>
        </TouchableHighlight>
    )
}