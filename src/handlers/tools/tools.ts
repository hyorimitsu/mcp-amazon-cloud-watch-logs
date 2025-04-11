import { zodToJsonSchema } from 'zod-to-json-schema'
import * as events from '../../operations/events.ts'
import * as groups from '../../operations/groups.ts'
import * as eventsSchema from '../../operations/schemas/events.ts'
import * as groupsSchema from '../../operations/schemas/groups.ts'
import * as streamsSchema from '../../operations/schemas/streams.ts'
import * as streams from '../../operations/streams.ts'
import {
  type CallToolDefinition,
  isToolName,
  type ListToolDefinition,
  type ListToolDefinitionItem,
  ToolName,
} from './types.ts'

const toolDefinitions: ListToolDefinition & CallToolDefinition = {
  [ToolName.CreateLogGroup]: {
    name: ToolName.CreateLogGroup,
    description: 'Create a new Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(groupsSchema.CreateLogGroupRequestSchema),
    requestSchema: groupsSchema.CreateLogGroupRequestSchema,
    operationFn: groups.createLogGroup,
  },
  [ToolName.DescribeLogGroups]: {
    name: ToolName.DescribeLogGroups,
    description: 'List and describe Amazon CloudWatch Logs log groups',
    inputSchema: zodToJsonSchema(groupsSchema.DescribeLogGroupsRequestSchema),
    requestSchema: groupsSchema.DescribeLogGroupsRequestSchema,
    operationFn: groups.describeLogGroups,
  },
  [ToolName.DeleteLogGroup]: {
    name: ToolName.DeleteLogGroup,
    description: 'Delete an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(groupsSchema.DeleteLogGroupRequestSchema),
    requestSchema: groupsSchema.DeleteLogGroupRequestSchema,
    operationFn: groups.deleteLogGroup,
  },
  [ToolName.CreateLogStream]: {
    name: ToolName.CreateLogStream,
    description: 'Create a new log stream in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.CreateLogStreamRequestSchema),
    requestSchema: streamsSchema.CreateLogStreamRequestSchema,
    operationFn: streams.createLogStream,
  },
  [ToolName.DescribeLogStreams]: {
    name: ToolName.DescribeLogStreams,
    description: 'List and describe log streams in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.DescribeLogStreamsRequestSchema),
    requestSchema: streamsSchema.DescribeLogStreamsRequestSchema,
    operationFn: streams.describeLogStreams,
  },
  [ToolName.DeleteLogStream]: {
    name: ToolName.DeleteLogStream,
    description: 'Delete a log stream in an Amazon CloudWatch Logs log group',
    inputSchema: zodToJsonSchema(streamsSchema.DeleteLogStreamRequestSchema),
    requestSchema: streamsSchema.DeleteLogStreamRequestSchema,
    operationFn: streams.deleteLogStream,
  },
  [ToolName.PutLogEvents]: {
    name: ToolName.PutLogEvents,
    description: 'Write log events to a specified log stream in Amazon CloudWatch Logs',
    inputSchema: zodToJsonSchema(eventsSchema.PutLogEventsRequestSchema),
    requestSchema: eventsSchema.PutLogEventsRequestSchema,
    operationFn: events.putLogEvents,
  },
  [ToolName.GetLogEvents]: {
    name: ToolName.GetLogEvents,
    description: 'Retrieve log events from a specified log stream in Amazon CloudWatch Logs',
    inputSchema: zodToJsonSchema(eventsSchema.GetLogEventsRequestSchema),
    requestSchema: eventsSchema.GetLogEventsRequestSchema,
    operationFn: events.getLogEvents,
  },
  [ToolName.FilterLogEvents]: {
    name: ToolName.FilterLogEvents,
    description:
      'Search log events with a pattern across log groups and streams in Amazon CloudWatch Logs',
    inputSchema: zodToJsonSchema(eventsSchema.FilterLogEventsRequestSchema),
    requestSchema: eventsSchema.FilterLogEventsRequestSchema,
    operationFn: events.filterLogEvents,
  },
}

// Available tools for Amazon CloudWatch Logs operations (for listing)
export const tools: ListToolDefinitionItem[] = Object.entries(toolDefinitions).map(([, value]) => ({
  name: value.name,
  description: value.description,
  inputSchema: value.inputSchema,
}))

// Available tools for Amazon CloudWatch Logs operations (for execution)
export const callTools = Object.entries(toolDefinitions).reduce<CallToolDefinition>(
  (acc, [key, value]) => {
    if (isToolName(key)) {
      acc[key] = {
        requestSchema: value.requestSchema,
        operationFn: value.operationFn,
      }
    }
    return acc
  },
  {} as CallToolDefinition,
)
