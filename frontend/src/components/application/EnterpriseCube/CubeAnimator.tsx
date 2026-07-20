import { animated, useSpring } from "@react-spring/three";
import { useEffect } from "react";

interface Props {

    target: string;

    children: React.ReactNode;

}

export default function CubeAnimator({

    target,
    children,

}: Props) {

    const [spring, api] = useSpring(() => ({

        rotation: [0.7, 0.7, 0],

        config: {

            mass: 4,
            tension: 160,
            friction: 22,

        }

    }));

    useEffect(() => {

        switch (target) {

            case "Reward":

                api.start({

                    rotation: [0.7, 0.7, 0],

                });

                break;

            case "Refresh":

                api.start({

                    rotation: [0.7, -0.7, 0],

                });

                break;

            case "Remediate":

                api.start({

                    rotation: [-0.7, 0.7, 0],

                });

                break;

            case "Replace":

                api.start({

                    rotation: [-0.7, -0.7, 0],

                });

                break;

        }

    }, [target]);

    return (

        <animated.group rotation={spring.rotation as any}>

            {children}

        </animated.group>

    );

}